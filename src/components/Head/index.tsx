interface NavBarProps {}

const Head: React.FunctionComponent<NavBarProps> = () => {
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex justify-center items-center">
      <h1 className="text-2xl font-bold">Game Finder</h1>
    </div>
  );
};

export default Head;
