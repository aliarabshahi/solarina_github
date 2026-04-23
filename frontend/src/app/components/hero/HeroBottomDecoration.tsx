// app/components/hero/HeroBottomDecoration.tsx

/** Bottom blurred shape decoration for Hero section */
export default function HeroBottomDecoration() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-8rem)] 
                 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none 
                 sm:top-[calc(100%-20rem)]"
    >
      <div
        className="relative right-[calc(50%+3rem)] aspect-[1155/678] w-[30rem] 
                   translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] 
                   opacity-30 sm:right-[calc(50%+36rem)] sm:w-[60rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>
  );
}
