import React from "react";
import CustomBtnLg from "../../../common/CustomBtnLg";

const learnAnyData = [
  {
    id: 0,
    title: "1500+",
    desc: "Active Users",
  },
  {
    id: 1,
    title: "60+",
    desc: "Expert Instructors",
  },
  {
    id: 2,
    title: "210+",
    desc: "Online Courses",
  },
  {
    id: 3,
    title: "255+",
    desc: "Finished Sessions",
  },
];

const LearnAny = () => {
  return (
    <div className="wrapper mt-16 md:mt-16 lg:mt-20 pt-20 pb-10">
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 mb-16 lg:mb-0">
            <div className="flex justify-center">
              <img
                src="/assets/learn_anything.png"
                alt="Learn Anything, Anywhere, Anytime"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="lg:pl-7">
              <div className="text-left">
                <h2 className="text-gold-light_400 text-center mb-7 lg:mb-10  font-bold lg:font-extrabold text-2xl lg:text-3xl">
                  Learn Anything, Anytime, From Anywhere
                </h2>
                <p className="text-[#e9e9e97a] text-[15px] mb-4">
                  e-learning the new way of learning. You can learn latest
                  strategies, trends, indicators etc. as and when you wish. We
                  keep on adding courses on all the latest topics and
                  strategies. You can explore the topics of your choice or by
                  your trading experience.
                </p>
              </div>

              <div className="mb-4">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {learnAnyData?.map(({ id, title, desc }) => (
                    <li className="shadow-2xl" key={id}>
                      <div className="py-6 px-4 bg-blue-light border border-[#041996] rounded-[10px] text-center">
                        <h5 className="text-[18px] leading-6 font-bold tracking-[0.2px] text-gold-light_400 mb-[6px]">
                          {title}
                        </h5>
                        <h6 className="text-[13px] text-[#757589]">{desc}</h6>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 md:mt-16 text-left">
                <CustomBtnLg title="Explore More" text="text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnAny;
