import { GetStaticProps, GetStaticPropsContext } from 'next';

export const getStaticProps = async (context) => {
  const res = await fetch('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')

  const data = await res.text()

  return {
    props: {
      data,
    },
  }
}
