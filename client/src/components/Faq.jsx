import React from 'react'
import { assets } from '../assets/data'
import Title from './Title'

const Faq = () => {
  const [openIndex, setOpenIndex] = React.useState(null)
  const faqsData = [
    {
      question: 'Lightning-Fast Booking',
      answer: 'Designed for speed - instant search and seamless property viewing.'
    },
    {
      question: 'Fully Customizable Homes',
      answer: 'Easily change layouts, features, and designs to fit your lifestyle.'
    },
    {
      question: 'Responsive by Location',
      answer: 'Every property is accessible by area - no extra effort required.'
    },
    {
      question: 'Real Estate Powered',
      answer: 'Backed using trusted property data - no extra agents or steps needed.'
    },
    {
      question: 'Smart Home Support',
      answer: 'All houses come ready with modern smart living features included.'
    }
  ]

  return (
    <section className='max-padd-container py-16 xl:py-22'>
      {/* Container */}
      <div className='flex flex-col gap-y-12 xl:flex-row'>
        {/* Image - left side */}
        <div className="flex-1">
          <div className='relative rounded-3xl overflow-hidden inline-block'>
            <img src={assets.faq} alt="faqImg" className='block w-full' />
            <div className='absolute top-5 left-5 right-5 bg-white p-3 rounded-2xl flex items-center gap-4 z-10'>
              <img src={assets.signature} alt="signImg" width={55} />
              <div>
                <h5 className='bold-16'>Trusted Real Estate Experts</h5>
                <p>Trust, clarity, and simplicity are at the core of everything we do to make your property journey easy.</p>
              </div>
            </div>
          </div>
        </div>
        {/* FAQS - right side */}     
        <div className="flex-1 flex flex-col justify-center">
          <Title
            title1={"Homes Made for Living"} 
            title2={"Simplifying Your Property Search Every Step"}
            para={
              "From finding the right location to finalizing the deal, we ensure your real estate journey is smooth, efficient, and fulfilling."
            }
            titleStyles={"mb-10"}
          />
          
          <div className='max-w-xl w-full flex flex-col gap-4 items-start text-left'>
            {faqsData.map((faq, index) => (
              <div key={index} className='flex flex-col items-start w-full'>
                <div 
                  className='
                    flex 
                    items-center 
                    justify-between 
                    w-full 
                    cursor-pointer 
                    bg-secondary/10 
                    border 
                    border-slate-900/10 
                    p-2 
                    px-4 
                    rounded-lg
                  ' 
                  onClick={() => setOpenIndex(
                    openIndex === index ? null : index
                  )}>
                  <h2 className='text-sm'>{faq.question}</h2>
                  <img src={assets.down} alt="" />
                </div>
                <p className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq