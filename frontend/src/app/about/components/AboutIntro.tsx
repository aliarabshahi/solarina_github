/**
 * AboutIntro — shows the main page title and short description
 */
export default function AboutIntro() {
  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F9ECE]">
        درباره <span className="text-[#F477B8]">نام برند</span>
      </h1>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600">
        جایی برای یادگیری، همکاری و ساخت آینده‌ای روشن‌تر با فناوری و داده.
      </p>
    </div>
  );
}
