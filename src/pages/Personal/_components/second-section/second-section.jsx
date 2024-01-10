import { images } from '../../../../constants';

const SecondSection = () => {
  return (
    <div>
      <div className="items-center justify-center flex">
        <div className="w-full bg-lightBlue relative">
          <div className="py-16">
            <div className="md:space-y-0 p-10 flex-row-reverse md:flex justify-center">
              <div className="text-2xl md:text-4xl items-center flex w-full md:w-[40%] order-2 md:order-1">
                <div className="flex md:justify-center">
                  {/* {/* <div className="space-y-10"> */}
                    <div className="space-y-1 md:text-md md:text-center w-full md:w-[70%]"> 
                      <div className="text-primary font-bold md:leading-normal leading-[35.84px] mx-auto text-xl xl:w-1/2">
                        EXPERIENCE HASSLE-FREE BILL PAYMENTS
                      </div>
                      <hr className="bg-yellow h-1 w-[50%] xl:mx-auto" />
                      <div className="pt-4 text-xl font-medium text-primary leading-8 xl:leading-6 md:leading-[35.84px] w-full">
                        Enjoy the convenience of streamlined transactions, timely reminders, and
                        secure processes, making it the smart choice for effortless financial
                        management and peace of mind.
                      </div>
                  </div>
                </div>
                <div className='hidden xl:block absolute w-[12%] bottom-[45                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        .35rem] right-[15rem] h-[250px] bg-[#0E8CBD] rounded-b-[10px]' />
              </div>
              <div className="mb-10 md:mb-0 h-full order-1 md:p-0 mt-10">
                <img
                  alt="image"
                  src={images.sectionTwo}
                  className="object-cover md:rounded-[60px] rounded-[40px] w-[400.5px] h-[60%] p-10"
                />
              </div>
              <div className='hidden xl:block absolute w-[12%] bottom-0 left-[6rem] h-[250px] bg-[#0E8CBD] rounded-t-[10px]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
