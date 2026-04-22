import {
  Children,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

type TabsContextType = {
  active: string;
  setActive: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext(): TabsContextType {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used inside <Tabs>.');
  }
  return context;
}

type TabsRootProps = {
  defaultValue: string;
  children: ReactNode;
};

function Root({ defaultValue, children }: TabsRootProps): JSX.Element {
  const [active, setActive] = useState(defaultValue);
  const value = useMemo(() => ({ active, setActive }), [active]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

type ListProps = {
  children: ReactNode;
};

function List({ children }: ListProps): JSX.Element {
  return <div className="tabs-list">{children}</div>;
}

type TriggerProps = {
  value: string;
  children: ReactNode;
};

function Trigger({ value, children }: TriggerProps): JSX.Element {
  const { active, setActive } = useTabsContext();
  const selected = active === value;

  return (
    <button
      role="tab"
      aria-selected={selected}
      className={selected ? 'tab active' : 'tab'}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

type ContentProps = {
  value: string;
  children: ReactNode;
};

function Content({ value, children }: ContentProps): JSX.Element | null {
  const { active } = useTabsContext();
  if (active !== value) return null;
  return <div className="tab-content">{children}</div>;
}

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};

export function inferDefaultTab(children: ReactNode): string {
  const node = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props?.value,
  );
  if (isValidElement(node) && typeof node.props.value === 'string') {
    return node.props.value;
  }
  return 'overview';
}
