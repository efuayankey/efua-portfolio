'use client';
import { useState, useCallback, useEffect } from 'react';
import Boot from '@/components/Boot';
import Ticker from '@/components/Ticker';
import Nav from '@/components/Nav';
import Cursor from '@/components/Cursor';
import Graph from '@/components/Graph';
import Tooltip, { TooltipState } from '@/components/Tooltip';
import Panel from '@/components/Panel';
import Chatbot from '@/components/Chatbot';
import MobileView from '@/components/MobileView';

export default function Home() {
  const [isMobile,   setIsMobile]   = useState(false);
  const [bootDone,   setBootDone]   = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [chatOpen,   setChatOpen]   = useState(false);
  const [tooltip,    setTooltip]    = useState<TooltipState | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const panelOpen = Boolean(activeNode) && activeNode !== 'ask';

  const handleNodeClick = useCallback((id: string) => {
    if (id === 'ask') {
      setChatOpen(prev => !prev);
      setActiveNode(null);
    } else if (id === 'resume') {
      // resume link — will be updated with Google Doc URL when ready
    } else {
      setActiveNode(prev => prev === id ? null : id);
      setChatOpen(false);
    }
  }, []);

  const handleNodeHover = useCallback((tip: TooltipState | null) => {
    setTooltip(tip);
  }, []);

  const closePanel = useCallback(() => setActiveNode(null), []);

  if (isMobile) return <MobileView />;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <Cursor />

      {!bootDone && <Boot onDone={() => setBootDone(true)} />}

      <Ticker />
      <Nav />

      <Graph
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        activeNode={activeNode}
        bootDone={bootDone}
        panelOpen={panelOpen}
      />

      <Tooltip tip={tooltip} />

      <Panel activeNode={activeNode} onClose={closePanel} />

      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
