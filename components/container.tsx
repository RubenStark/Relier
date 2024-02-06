function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen justify-center">
      <div className="w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
}

export default Container;
