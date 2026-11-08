function LoadingScreen({ text = 'Loading…' }) {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center font-hand text-3xl text-muted" role="status">
      {text}
    </div>
  );
}

export default LoadingScreen;
