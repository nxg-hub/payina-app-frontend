import images from '../../../../constants/images';

const ThirdSection = () => {
  return (
    <div className="flex flex-col justify-center text-center bg-black w-full px-4">
      <div className="text-lightBlue font-bold py-6 text-3xl md:text-4xl xl:text-5xl">Businesses That Trust Us</div>
      <hr className="border mt-4 mb-4 text-yellow w-[85%] mx-auto" />
      <div className="space-y-10 md:space-y-10 md:px-10 py-10 xl:space-y-0">
        <div className="flex items-center md:px-10 md:w-[250px] flex-col md:flex-row gap-10 md:justify-center xl:justify-between xl:w-5/6 mx-auto  xl:py-10">
          <img src={images.Netflix} alt="netflix_logo" className="md:w-40 w-[30%]" />
          <img src={images.Nivea} alt="nivea_logo" className="bg-[#222D86] p-3 md:p-4 md:w-40 w-[40%]" />
          <img src={images.CVS} alt="cvs_logo" className="md:w-40 w-[50%]"  />
          <img src={images.Google} alt="google_logo" className="md:w-40 w-[40%]" />
        </div>
        <div className="flex items-center md:px-10 md:w-[250px] flex-col gap-10 md:flex-row md:justify-center xl:justify-between xl:w-5/6 mx-auto  xl:py-0">
          <img src={images.Phillips} alt="netflix_logo" className="h-10 md:w-fit w-[40%]" />
          <img src={images.Zillow} alt="nivea_logo" className="bg-[#222D86] p-3 md:w-fit w-[40%]" />
          <img src={images.Sap} alt="cvs_logo" className='md:w-fit w-[40%]' />
          <img src={images.Hermes} alt="google_logo" className="md:w-40 w-[30%]" />
        </div>
        <div className="flex items-center md:px-10 md:w-[250px] flex-col gap-10 md:flex-row md:justify-center xl:justify-between xl:w-3/4 mx-auto  xl:py-10">
          <img src={images.Huawei} alt="netflix_logo" className='md:w-fit w-[20%]' />
          <img src={images.Zara} alt="nivea_logo" className="bg-[#222D86] p-4 md:w-fit w-[40%]" />
          <img src={images.Ge} alt="cvs_logo" className='md:w-fit w-[25%]' />
        </div>
      </div>
      <hr className="border mt-4 mb-4 text-yellow w-[85%] mx-auto" />
    </div>
  );
};

export default ThirdSection;
