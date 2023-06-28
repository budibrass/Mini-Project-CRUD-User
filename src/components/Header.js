import React from 'react';

const Header = ({ title }) => {
  return (
    <section className="mt-5">
      <h1 className="text-center text-5xl max-[320px]:text-4xl">
        {title}
      </h1>
    </section>
  )
}

export default Header