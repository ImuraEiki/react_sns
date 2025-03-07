interface TabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  titles: string[];
}

<<<<<<< HEAD
export const Tab = ({ activeTab, setActiveTab, titles }: TabProps) => {
  const activeTabClass =
    ' text-blue-500 border-b-2 font-medium border-blue-500';
=======
export const Tab = ({ activeTab, setActiveTab, titles }: TabProps ) => {
  const activeTabClass =
  ' text-blue-500 border-b-2 font-medium border-blue-500';
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e

  return (
    <div className="dark">
      <nav className="flex flex-col sm:flex-row">
<<<<<<< HEAD
        {titles?.map((title, i) => (
          <button
            className={
              'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none' +
              (activeTab === i + 1 ? activeTabClass : '')
            }
            onClick={() => setActiveTab(i + 1)}
          >
            {title}
          </button>
        ))}
=======
        {
          titles?.map((title, i) => 
            <button
              className={
                'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none' +
                (activeTab === i + 1 ? activeTabClass : '')
              }
              onClick={() => setActiveTab(i + 1)}
            >
              {title}
            </button>
          )
        }
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
      </nav>
    </div>
  );
};
