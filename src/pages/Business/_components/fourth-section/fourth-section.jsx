import polygon from './../../../../assets/images/polygongroup.png'

const FourthSection = () => {
  return (
    <div className=''>
    <div className=' text-[white] flex justify-center items-center'> 
    <div> <p className='text-center pt-6 text-[#000]  text-[14px] md:text-[20px]'>What Set’s Us Apart</p></div> 
     </div> 
    
     <hr className="border-none bg-yellow h-1 mt-4 mb-4  w-[87%] mx-auto" />
     <div className="xl:py-20 py-0 grid place-content-center">
        <img src={polygon} className='pb-10 pt-10' alt="" />
      </div>

  
</div>
  )
}

export default FourthSection