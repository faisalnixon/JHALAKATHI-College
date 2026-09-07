import collegeLogo from "../assets/Untitled design (1).png";

function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t-4 border-primary bg-muted px-4 py-16 md:px-16"
    >
      <div className="mx-auto flex max-w-360 flex-col gap-8 md:flex-row md:gap-6">
        <div className="flex w-full flex-col gap-4 md:w-[65%]">
          <div className="flex items-center gap-4">
            <a href="/" className="h-10 w-10">
              <img
                src={collegeLogo}
                alt="Jhalakathi Govt Women's College"
                className="h-full w-full object-contain"
              />
            </a>

            <h2 className="text-lg font-bold text-primary md:text-xl lg:text-2xl">
              ঝালকাঠি সরকারি মহিলা কলেজ
            </h2>
          </div>

          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            প্রতিষ্ঠালগ্ন থেকেই শিক্ষা, নৈতিক মূল্যবোধ ও দক্ষতার মাধ্যমে নারীদের ক্ষমতায়ন এবং দেশের অগ্রগতিতে কার্যকর অবদান রাখতে আমরা প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 md:w-[35%]">
          <h4 className="text-xl font-semibold text-primary">
            যোগাযোগের তথ্য
          </h4>

          <div className="flex flex-col gap-4 text-muted-foreground">
            <p>ঝালকাঠি, বরিশাল বিভাগ, বাংলাদেশ</p>
            <p>০১৩০OTE১০৭০৮</p>
            <p>jgwcollege@yahoo.com</p>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <p className="mb-1 text-sm text-muted-foreground">
              অফিস সময়সূচী
            </p>

            <p className="font-bold">
              রবি - বৃহস্পতি: সকাল ৯:০০ - বিকাল ৪:০০
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-360 border-t pt-8 text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          © ২০২৪ ঝালকাঠি সরকারি মহিলা কলেজ। সর্বস্বত্ব সংরক্ষিত। শিক্ষা মন্ত্রণালয় কর্তৃক তৈরীকৃত।
        </p>
      </div>
    </footer>
  );
}

export default Footer;