const RecentlyViewed = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      <button
        className="bg-muted px-2 py-8 rounded-l-lg shadow-lg hover:bg-accent transition-colors"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span className="text-xs font-medium text-muted-foreground">
          Recently Viewed
        </span>
      </button>
    </div>
  );
};

export default RecentlyViewed;
