function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen justify-center">
      <div className="w-full md:max-w-3xl">
        {children}
      </div>
    </div>
  );
}

export default Container;
