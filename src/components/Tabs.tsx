import { type FC, type ReactElement, useState } from 'react';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import s from '@/styles/tabs.module.css';

interface ActiveState {
  [key: string]: true | undefined;
}

interface TabsProps {
  tabs: {
    name: string;
    component: ReactElement;
  }[];
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [isActivated, setIsActivated] = useState<ActiveState>({
    overview: true,
    images: undefined,
    videos: undefined,
  });
  const handleTabChange = (value: string) => {
    if (value === 'images') {
      setIsActivated((prevState) => ({
        ...prevState,
        images: true,
      }));
    } else if (value === 'videos') {
      setIsActivated((prevState) => ({
        ...prevState,
        videos: true,
      }));
    }
  };

  return (
    <>
      <Root
        onValueChange={handleTabChange}
        className='flex w-full flex-col'
        defaultValue='overview'
      >
        <List
          className='flex w-full flex-row items-center justify-center gap-x-6 py-6'
          aria-label='tabs list'
        >
          {tabs.map((tab) => (
            <Trigger key={tab.name} value={tab.name.toLowerCase()} asChild>
              <div className={s.trigger}>
                <span className='capitalize'>{tab.name}</span>
              </div>
            </Trigger>
          ))}
        </List>
        {tabs.map((tab) => (
          <Content
            key={tab.name}
            value={tab.name.toLowerCase()}
            className={s.content}
            forceMount={isActivated[tab.name.toLowerCase()]}
          >
            {tab.component}
          </Content>
        ))}
      </Root>
    </>
  );
};

export default Tabs;
