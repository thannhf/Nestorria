import React from 'react'

const Title = ({title1, title2, titleStyles, title2Styles, paraStyles, para}) => {
  return (
    <div className={`${titleStyles}`}>
      <h4 className="h4 text-secondary">{title1}</h4>
      <h1 className={`${title2Styles} h1 capitalize`}>{title2}</h1>
      <p className={`${paraStyles} max-w-lg mt-2`}>
        {para ? para : "Experience modern living through well-presented properties, professional support, and throughtfully designed spaces."}
      </p>
    </div>
  )
}

export default Title