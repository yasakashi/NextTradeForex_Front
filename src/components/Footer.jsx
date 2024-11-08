import React from "react";
import Copyright from "./Copyright";

const footerData = [
  {
    id: 0,
    title: "Quick Links",
    list: [
      { href: "/", item: "Algo Trading" },
      { href: "/", item: "Learn To Trade" },
      { href: "/", item: "Become a Coach" },
      { href: "/", item: "Forex Glossary" },
      { href: "/", item: "Courses" },
    ],
  },
  {
    id: 1,
    title: "About",
    list: [
      { href: "/", item: "Home" },
      { href: "/", item: "Who we are" },
    ],
  },

  {
    id: 2,
    title: "Support",
    list: [
      { href: "/", item: "Privacy Policy" },
      { href: "/", item: "Terms of Use" },
      { href: "/", item: "Contact Us" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-blue-dark border-gold-light_300 pt-16 z-10 relative mt-16">
      {/* <img
        className="absolute bottom-[calc(100%-42px)] !z-1"
        src="/assets/bgicon3.png"
        alt="background"
      /> */}

      <div className="wrapper z-10">
        <div className="flex items-center sm:items-start flex-col sm:flex-row space-y-8 sm:space-y-0">
          <div className="flex-[3]">
            <div>
              <img src="/assets/logo.png" alt="Logo" />
            </div>
          </div>

          {/*  */}
          <div className="flex-[9]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pl-12">
              {footerData?.map((data) => (
                <div key={data.id}>
                  <div className="mb-10 md:mb-16">
                    <h5 className="mb-4 md:mb-8 text-[22px] text-white font-extrabold">
                      {data.title}
                    </h5>
                    <ul className="text-[16px] ">
                      {data.list?.map((item, index) => (
                        <li
                          key={Math.random() * index}
                          className="mb-[12px] sm:mb-[18px] text-white hover:text-gold-dark_200 transition-colors"
                        >
                          <a className="font-medium " href={item.href}>
                            {item.item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div>
                <div className="mb-10 sm:mb-16">
                  <div className="mb-4 sm:mb-8">
                    <h5 className="mb-4 sm:mb-8 text-[22px] text-white font-extrabold">
                      Socaial Media
                    </h5>
                    <ul className="text-[16px] flex items-center space-x-2">
                      <li className="mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        <a className="font-medium " href="/">
                          <svg
                            className="social_icon"
                            fill="#030c3b"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                          >
                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                          </svg>
                        </a>
                      </li>

                      <li className="mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        <a className="font-medium " href="/">
                          <svg
                            className="social_icon"
                            fill="#030c3b"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                          </svg>
                        </a>
                      </li>

                      <li className="mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        <a className="font-medium " href="/">
                          <svg
                            className="social_icon"
                            fill="#030c3b"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                          </svg>
                        </a>
                      </li>

                      <li className="mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        <a className="font-medium " href="/">
                          <svg
                            className="social_icon"
                            fill="#030c3b"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                          </svg>
                        </a>
                      </li>

                      <li className="mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        <a className="font-medium " href="/">
                          <svg
                            className="social_icon"
                            fill="#030c3b"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="mb-2 sm:mb-4 text-[22px] text-white font-extrabold">
                      Contact Us
                    </h5>
                    <ul className="text-[16px] ">
                      <li className="cursor-pointer mb-[12px] md:mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        +13322416277
                      </li>
                      <li className="cursor-pointer mb-[12px] md:mb-[18px] text-white hover:text-gold-dark_200 transition-colors">
                        <b>cs@nexttradeforex.com</b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* copy right */}
      <Copyright />
    </footer>
  );
};

export default Footer;
