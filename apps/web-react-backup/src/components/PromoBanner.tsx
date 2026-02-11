const PromoBanner = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="banner-gradient rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="text-lg font-semibold text-secondary-foreground/90">
              Click to read stories on WEBTOON!
            </p>
            <div className="flex items-center gap-6">
              <span className="text-2xl font-bold text-secondary-foreground/80 tracking-wider">
                Disney
              </span>
              <span className="text-2xl font-bold text-destructive tracking-wider">
                MARVEL
              </span>
              <span className="text-2xl font-bold text-secondary-foreground/80 tracking-wider">
                STAR WARS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
