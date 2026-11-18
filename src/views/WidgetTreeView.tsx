import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { 
  GitFork, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Code2, 
  Layers, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  Box,
  Layout,
  Type,
  Maximize2,
  FileText
} from 'lucide-react';

export interface WidgetNode {
  id: string;
  type: string;
  name: string;
  category: 'structure' | 'single-child' | 'multi-child' | 'leaf';
  properties: Record<string, string>;
  child?: WidgetNode;
  children?: WidgetNode[];
}

interface CatalogItem {
  type: string;
  category: 'structure' | 'single-child' | 'multi-child' | 'leaf';
  defaultProps: Record<string, string>;
}

const WIDGET_CATALOG: CatalogItem[] = [
  // Structure
  { type: 'Scaffold', category: 'structure', defaultProps: {} },
  { type: 'AppBar', category: 'single-child', defaultProps: { title: 'My App' } },
  
  // Single Child
  { type: 'Center', category: 'single-child', defaultProps: {} },
  { type: 'Padding', category: 'single-child', defaultProps: { padding: 'EdgeInsets.all(16.0)' } },
  { type: 'Container', category: 'single-child', defaultProps: { color: 'Colors.blue' } },
  { type: 'Card', category: 'single-child', defaultProps: { elevation: '4.0' } },
  { type: 'Expanded', category: 'single-child', defaultProps: { flex: '1' } },
  { type: 'SizedBox', category: 'single-child', defaultProps: { height: '20.0' } },
  { type: 'GestureDetector', category: 'single-child', defaultProps: { onTap: '() => print("Tapped")' } },

  // Multi Child
  { type: 'Column', category: 'multi-child', defaultProps: { mainAxisAlignment: 'MainAxisAlignment.center' } },
  { type: 'Row', category: 'multi-child', defaultProps: { crossAxisAlignment: 'CrossAxisAlignment.center' } },
  { type: 'Stack', category: 'multi-child', defaultProps: {} },
  { type: 'ListView', category: 'multi-child', defaultProps: {} },

  // Leaf
  { type: 'Text', category: 'leaf', defaultProps: { data: 'Hello Flutter' } },
  { type: 'Icon', category: 'leaf', defaultProps: { icon: 'Icons.star' } },
  { type: 'ElevatedButton', category: 'leaf', defaultProps: { label: 'Click Me' } },
  { type: 'Image', category: 'leaf', defaultProps: { src: 'assets/logo.png' } },
  { type: 'CircularProgressIndicator', category: 'leaf', defaultProps: {} },
];

const INITIAL_TREE: WidgetNode = {
  id: 'node-1',
  type: 'Scaffold',
  name: 'Scaffold',
  category: 'structure',
  properties: {},
  children: [
    {
      id: 'node-2',
      type: 'Center',
      name: 'Center',
      category: 'single-child',
      properties: {},
      child: {
        id: 'node-3',
        type: 'Column',
        name: 'Column',
        category: 'multi-child',
        properties: { mainAxisAlignment: 'MainAxisAlignment.center' },
        children: [
          {
            id: 'node-4',
            type: 'Text',
            name: 'Text',
            category: 'leaf',
            properties: { data: 'Welcome to Mobile Dev Quest' },
          },
          {
            id: 'node-5',
            type: 'Padding',
            name: 'Padding',
            category: 'single-child',
            properties: { padding: 'EdgeInsets.all(12.0)' },
            child: {
              id: 'node-6',
              type: 'ElevatedButton',
              name: 'ElevatedButton',
              category: 'leaf',
              properties: { label: 'Start Learning' },
            },
          },
        ],
      },
    },
  ],
};

// Formatter for Indented Widget: child: anotherWidget
function formatWidgetTreeIndented(node: WidgetNode, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  const propList = Object.entries(node.properties || {})
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
  const propStr = propList ? ` (${propList})` : '';

  let out = `${spaces}${node.type}${propStr}:\n`;

  if (node.category === 'single-child' && node.child) {
    out += `${spaces}  child:\n`;
    out += formatWidgetTreeIndented(node.child, indent + 2);
  } else if (node.category === 'multi-child' && node.children && node.children.length > 0) {
    out += `${spaces}  children:\n`;
    for (const ch of node.children) {
      out += formatWidgetTreeIndented(ch, indent + 2);
    }
  } else if (node.category === 'structure' && node.children && node.children.length > 0) {
    for (const ch of node.children) {
      out += `${spaces}  body:\n`;
      out += formatWidgetTreeIndented(ch, indent + 2);
    }
  }

  return out;
}

// Formatter for Pure Flutter Dart Code
function formatWidgetTreeFlutterDart(node: WidgetNode, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  const propList = Object.entries(node.properties || {})
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  let out = `${spaces}${node.type}(`;
  if (propList) out += `${propList}`;

  if (node.category === 'single-child' && node.child) {
    if (propList) out += ',\n'; else out += '\n';
    out += `${spaces}  child: ${formatWidgetTreeFlutterDart(node.child, indent + 1).trimStart()},\n${spaces})`;
  } else if (node.category === 'multi-child' && node.children && node.children.length > 0) {
    if (propList) out += ',\n'; else out += '\n';
    out += `${spaces}  children: [\n`;
    for (const ch of node.children) {
      out += `${formatWidgetTreeFlutterDart(ch, indent + 2)},\n`;
    }
    out += `${spaces}  ],\n${spaces})`;
  } else if (node.category === 'structure' && node.children && node.children.length > 0) {
    if (propList) out += ',\n'; else out += '\n';
    out += `${spaces}  body: ${formatWidgetTreeFlutterDart(node.children[0], indent + 1).trimStart()},\n${spaces})`;
  } else {
    out += ')';
  }

  return out;
}

// Tree Validator: Spotting layout traps & rule violations
interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  trapWarning?: string;
}

function validateWidgetTreeHierarchy(node: WidgetNode, parent?: WidgetNode): ValidationIssue[] {
  let issues: ValidationIssue[] = [];

  // 1. Bouchrika's Classic Trap: Expanded placed inside Center, Container, or Padding (must be inside Flex / Row / Column)
  if (node.type === 'Expanded') {
    if (!parent || (parent.type !== 'Row' && parent.type !== 'Column' && parent.type !== 'Flex')) {
      issues.push({
        type: 'error',
        message: `Illegal Expanded placement: Expanded is a child of ${parent ? parent.type : 'Root'}!`,
        trapWarning: 'Prof. Bouchrika Exam Trap: Expanded MUST be an immediate descendant of Row, Column, or Flex. Placing it inside Center, Container, or Padding causes a fatal layout crash at runtime!',
      });
    }
  }

  // 2. Single-child widget with missing child
  if (node.category === 'single-child' && !node.child) {
    issues.push({
      type: 'warning',
      message: `${node.type} has no "child:" defined. Consider adding a child widget.`,
    });
  }

  // 3. Multi-child widget with empty children
  if (node.category === 'multi-child' && (!node.children || node.children.length === 0)) {
    issues.push({
      type: 'info',
      message: `${node.type} has an empty "children: []" list.`,
    });
  }

  // 4. Unbounded ListView inside Column trap
  if (node.type === 'ListView' && parent && (parent.type === 'Column' || parent.type === 'Row')) {
    issues.push({
      type: 'error',
      message: `Unbounded viewport: ListView inside ${parent.type} has unbounded height!`,
      trapWarning: 'Wrap ListView in an Expanded or SizedBox widget, or set shrinkWrap: true to prevent "Vertical viewport was given unbounded height" error!',
    });
  }

  // Recurse down children
  if (node.child) {
    issues = [...issues, ...validateWidgetTreeHierarchy(node.child, node)];
  }
  if (node.children) {
    for (const ch of node.children) {
      issues = [...issues, ...validateWidgetTreeHierarchy(ch, node)];
    }
  }

  return issues;
}

export const WidgetTreeView: React.FC = () => {
  const [tree, setTree] = useState<WidgetNode>(INITIAL_TREE);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-3');
  const [activeCodeTab, setActiveCodeTab] = useState<'indented' | 'flutter'>('indented');
  const [copied, setCopied] = useState<boolean>(false);

  const indentedText = formatWidgetTreeIndented(tree);
  const flutterCode = formatWidgetTreeFlutterDart(tree);
  const validationIssues = validateWidgetTreeHierarchy(tree);

  const handleCopyCode = () => {
    const textToCopy = activeCodeTab === 'indented' ? indentedText : flutterCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetTree = () => {
    setTree(INITIAL_TREE);
    setSelectedNodeId('node-3');
    sound.playClick();
  };

  // Helper to find a node by ID
  const findNode = (root: WidgetNode, id: string): WidgetNode | null => {
    if (root.id === id) return root;
    if (root.child) {
      const res = findNode(root.child, id);
      if (res) return res;
    }
    if (root.children) {
      for (const ch of root.children) {
        const res = findNode(ch, id);
        if (res) return res;
      }
    }
    return null;
  };

  const selectedNode = findNode(tree, selectedNodeId) || tree;

  // Insert a child widget into selected node
  const handleAddWidget = (catalogItem: typeof WIDGET_CATALOG[0]) => {
    sound.playClick();
    const newNode: WidgetNode = {
      id: `node-${Date.now()}`,
      type: catalogItem.type,
      name: catalogItem.type,
      category: catalogItem.category as any,
      properties: { ...catalogItem.defaultProps },
    };

    const updateTree = (current: WidgetNode): WidgetNode => {
      if (current.id === selectedNodeId) {
        if (current.category === 'single-child') {
          return { ...current, child: newNode };
        } else if (current.category === 'multi-child' || current.category === 'structure') {
          return {
            ...current,
            children: [...(current.children || []), newNode],
          };
        }
      }

      if (current.child) {
        return { ...current, child: updateTree(current.child) };
      }
      if (current.children) {
        return { ...current, children: current.children.map(updateTree) };
      }
      return current;
    };

    setTree(updateTree(tree));
    setSelectedNodeId(newNode.id);
  };

  // Delete selected node from tree
  const handleDeleteNode = (idToDelete: string) => {
    if (idToDelete === tree.id) return; // Cannot delete root
    sound.playError();

    const deleteFromNode = (current: WidgetNode): WidgetNode => {
      if (current.child?.id === idToDelete) {
        const copy = { ...current };
        delete copy.child;
        return copy;
      }
      if (current.children) {
        return {
          ...current,
          children: current.children.filter((ch) => ch.id !== idToDelete).map(deleteFromNode),
        };
      }
      if (current.child) {
        return { ...current, child: deleteFromNode(current.child) };
      }
      return current;
    };

    setTree(deleteFromNode(tree));
    setSelectedNodeId(tree.id);
  };

  // Preset scenarios
  const loadScenario = (type: string) => {
    sound.playClick();
    if (type === 'trap-expanded') {
      // Bouchrika's Invalid Expanded inside Center Trap
      setTree({
        id: 'trap-1',
        type: 'Scaffold',
        name: 'Scaffold',
        category: 'structure',
        properties: {},
        children: [
          {
            id: 'trap-2',
            type: 'Center',
            name: 'Center',
            category: 'single-child',
            properties: {},
            child: {
              id: 'trap-3',
              type: 'Expanded',
              name: 'Expanded',
              category: 'single-child',
              properties: { flex: '1' },
              child: {
                id: 'trap-4',
                type: 'Text',
                name: 'Text',
                category: 'leaf',
                properties: { data: 'Fatal Layout Error!' },
              },
            },
          },
        ],
      });
      setSelectedNodeId('trap-3');
    } else if (type === 'cart-tile') {
      // Responsive Row with Expanded Cart Tile
      setTree({
        id: 'cart-1',
        type: 'Card',
        name: 'Card',
        category: 'single-child',
        properties: { elevation: '2.0' },
        child: {
          id: 'cart-2',
          type: 'Padding',
          name: 'Padding',
          category: 'single-child',
          properties: { padding: 'EdgeInsets.all(8.0)' },
          child: {
            id: 'cart-3',
            type: 'Row',
            name: 'Row',
            category: 'multi-child',
            properties: { crossAxisAlignment: 'CrossAxisAlignment.center' },
            children: [
              {
                id: 'cart-4',
                type: 'Container',
                name: 'Container (Thumbnail)',
                category: 'single-child',
                properties: { width: '64.0', height: '64.0' },
                child: { id: 'cart-5', type: 'Icon', name: 'Icon', category: 'leaf', properties: { icon: 'Icons.shopping_bag' } },
              },
              {
                id: 'cart-6',
                type: 'Expanded',
                name: 'Expanded',
                category: 'single-child',
                properties: { flex: '1' },
                child: {
                  id: 'cart-7',
                  type: 'Column',
                  name: 'Column',
                  category: 'multi-child',
                  properties: {},
                  children: [
                    { id: 'cart-8', type: 'Text', name: 'Text (Title)', category: 'leaf', properties: { data: 'Flutter Handbook' } },
                    { id: 'cart-9', type: 'Text', name: 'Text (Price)', category: 'leaf', properties: { data: '$29.99' } },
                  ],
                },
              },
              {
                id: 'cart-10',
                type: 'ElevatedButton',
                name: 'ElevatedButton',
                category: 'leaf',
                properties: { label: '+' },
              },
            ],
          },
        },
      });
      setSelectedNodeId('cart-6');
    }
  };

  // Recursive Tree Node Renderer for the Visual Diagram
  const renderVisualNode = (node: WidgetNode, depth: number = 0) => {
    const isSelected = selectedNodeId === node.id;
    const hasChildren = (node.children && node.children.length > 0) || node.child;

    return (
      <div key={node.id} className="relative pl-6 border-l-2 border-quest-border/40 my-2">
        {/* Branch line */}
        <div className="absolute -left-0.5 top-5 w-5 h-0.5 bg-quest-border/50" />

        <div
          onClick={() => {
            setSelectedNodeId(node.id);
            sound.playClick();
          }}
          className={`group flex items-center justify-between p-3 rounded-2xl border text-xs transition cursor-pointer ${
            isSelected
              ? 'bg-quest-primary/20 border-quest-primary ring-2 ring-quest-primary/40 text-white font-bold'
              : 'bg-quest-card/60 border-quest-border/50 hover:bg-quest-border/40 text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] ${
              node.category === 'structure' ? 'bg-purple-500/20 text-purple-300' :
              node.category === 'single-child' ? 'bg-sky-500/20 text-sky-300' :
              node.category === 'multi-child' ? 'bg-emerald-500/20 text-emerald-300' :
              'bg-amber-500/20 text-amber-300'
            }`}>
              {node.category === 'structure' ? 'S' :
               node.category === 'single-child' ? '1' :
               node.category === 'multi-child' ? 'N' : 'L'}
            </span>

            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{node.type}</span>
                <span className="text-[10px] text-quest-muted font-normal font-mono">
                  {node.category === 'single-child' ? '(child:)' :
                   node.category === 'multi-child' ? '(children:)' : ''}
                </span>
              </div>
              {Object.keys(node.properties || {}).length > 0 && (
                <div className="text-[10px] text-quest-muted font-mono truncate max-w-xs">
                  {JSON.stringify(node.properties).replace(/["{}]/g, '')}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
            {node.id !== tree.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNode(node.id);
                }}
                className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                title="Delete widget from tree"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sub-tree branches */}
        {node.child && (
          <div className="mt-1">
            <span className="text-[10px] font-mono text-sky-400 pl-6 block mb-1">↳ child:</span>
            {renderVisualNode(node.child, depth + 1)}
          </div>
        )}
        {node.children && node.children.map((ch, idx) => (
          <div key={ch.id} className="mt-1">
            <span className="text-[10px] font-mono text-emerald-400 pl-6 block mb-1">
              {node.category === 'structure' ? '↳ body:' : `↳ children[${idx}]:`}
            </span>
            {renderVisualNode(ch, depth + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <GitFork className="w-8 h-8 text-quest-primary" />
            <span>Widget Tree Architect Studio</span>
          </h1>
          <p className="text-sm text-quest-muted mt-1">
            Assemble, inspect, and validate Flutter widget hierarchies with the exact <code className="text-quest-primary font-mono font-bold">Widget: child: anotherWidget</code> syntax. Catch layout errors and exam traps in real-time.
          </p>
        </div>

        {/* Preset Scenarios */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadScenario('cart-tile')}
            className="px-3 py-1.5 rounded-xl glass-card text-xs text-quest-muted hover:text-white border border-quest-border/40 transition"
          >
            Load E-Commerce Tile
          </button>
          <button
            onClick={() => loadScenario('trap-expanded')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold transition hover:bg-rose-500/30"
          >
            Inspect Exam Trap
          </button>
          <button
            onClick={handleResetTree}
            className="p-2 rounded-xl glass-card text-quest-muted hover:text-white transition"
            title="Reset Tree"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Tree Architect (2 cols) + Output / Inspector (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Pane: Visual Hierarchy Builder */}
        <div className="glass-panel p-5 rounded-3xl border border-quest-border/60 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-quest-border/40 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-quest-primary" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Visual Widget Hierarchy</h2>
              </div>
              <span className="text-[11px] font-mono text-quest-muted">
                Selected: <strong className="text-white">{selectedNode.type}</strong>
              </span>
            </div>

            {/* Tree Nodes List */}
            <div className="py-3 max-h-[460px] overflow-y-auto scrollbar-thin">
              {renderVisualNode(tree)}
            </div>
          </div>

          {/* Widget Inserter Toolbar */}
          <div className="border-t border-quest-border/40 pt-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-quest-muted flex items-center justify-between">
              <span>Insert Child Widget into &lt;{selectedNode.type}&gt;:</span>
              <span className="text-[10px] text-quest-primary font-mono">
                Slot: {selectedNode.category === 'single-child' ? 'child:' : selectedNode.category === 'multi-child' ? 'children: []' : 'body:'}
              </span>
            </div>

            {selectedNode.category === 'leaf' ? (
              <div className="p-3 rounded-xl bg-quest-surface/50 border border-quest-border/40 text-xs text-quest-muted text-center">
                Leaf widgets ({selectedNode.type}) cannot contain child widgets. Select a container, column, row, or center node to add children.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {WIDGET_CATALOG.map((cat) => (
                  <button
                    key={cat.type}
                    onClick={() => handleAddWidget(cat)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold glass-card border border-quest-border/50 hover:border-quest-primary hover:text-white transition"
                  >
                    <Plus className="w-3 h-3 text-quest-primary" />
                    <span>{cat.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Representation & Live Architecture Validator */}
        <div className="space-y-6">
          
          {/* Top: Live Architecture Validator Banner */}
          <div className="glass-panel p-4 rounded-3xl border border-quest-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-quest-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-quest-primary" />
                <span>Architecture Diagnostics & Exam Trap Detector</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                validationIssues.some((i) => i.type === 'error')
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {validationIssues.some((i) => i.type === 'error') ? 'Layout Trap Detected' : 'Valid Widget Tree'}
              </span>
            </div>

            {validationIssues.length === 0 ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>The widget hierarchy satisfies all Flutter layout constraints and single/multi-child contracts.</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {validationIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs space-y-1 ${
                      issue.type === 'error'
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                        : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{issue.message}</span>
                    </div>
                    {issue.trapWarning && (
                      <p className="text-[11px] text-gray-300 pl-6">{issue.trapWarning}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom: Indented Tree Representation & Flutter Code */}
          <div className="glass-panel p-5 rounded-3xl border border-quest-border/60 space-y-4">
            
            <div className="flex items-center justify-between border-b border-quest-border/40 pb-3">
              {/* Tabs: Indented (child: anotherWidget) vs Pure Dart */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveCodeTab('indented');
                    sound.playClick();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeCodeTab === 'indented'
                      ? 'bg-quest-primary text-white shadow-md'
                      : 'text-quest-muted hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Indented Tree (Widget: child:)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveCodeTab('flutter');
                    sound.playClick();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeCodeTab === 'flutter'
                      ? 'bg-quest-primary text-white shadow-md'
                      : 'text-quest-muted hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Flutter Dart Code</span>
                </button>
              </div>

              {/* Copy Action */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-xs text-quest-muted hover:text-white glass-card px-2.5 py-1 rounded-xl transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Output Canvas */}
            <div className="rounded-2xl bg-[#0B0F19] p-4 border border-quest-border/60 overflow-x-auto max-h-[380px]">
              <pre className="font-mono text-xs sm:text-sm text-quest-accent whitespace-pre leading-relaxed">
                <code>{activeCodeTab === 'indented' ? indentedText : flutterCode}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
