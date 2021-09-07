import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import Chapter from '../components/Chapter';
import SideNav from '../components/SideNav';
import ContentButton from '../components/ContentButton';
import _ from 'lodash';
import Header from '../components/Header/Header';

interface Rules {
  chapters:Chapter[],
}

type Subrule = {
  id: string,
  text: string,
}

type Rule = {
  text: string
}

type Chapter = {
  title: string
  rules: string[],
}

export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [rules, setRules] = useState<Rules>({ chapters:[] });
  const [allContent, setAllContent] = useState([]);
  const [content, setContent] = useState([]);
  const [searchAll, setSearchAll] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<number>();
  const [search, setSearch] = useState<string>('');
  const [navOpen, setNavOpen] = useState<boolean>(true);
  
  const filter = () => {
    const filtered = [];
    const regex = new RegExp (`^[0-9]`)

    let splitted = data.split('\n');
    const allContent = splitted.filter((item:string) => item.match(regex))
    const creditsIndex = splitted.indexOf('Credits\r');
    const contentsIndex = splitted.indexOf('Contents\r') + 1;
    const glossarysIndex = splitted.indexOf('Glossary\r', splitted.indexOf('Glossary\r')+ 1);
    const glossary = splitted.slice(glossarysIndex);
    const contents = splitted.slice(contentsIndex, creditsIndex-2);
    splitted = splitted.slice(creditsIndex, glossarysIndex);
    
    setAllContent(allContent)

    for(let i = 1; i < 10; i++) {
      const chapter = splitted.filter((item:string) => item.match(`^[${i}]`))
      const chapterObj:Chapter = {
        title: chapter[0],
        rules: chapter.slice(1)
      }

      filtered.push(chapterObj);
    }
    setRules({...rules, chapters:filtered });
    setSelectedChapter(0);
    setContent(contents);
  }
  useEffect(() => filter(), []);

  

  const changeChapter = (value:number) => setSelectedChapter(value); 


  const [open, setOpen] = useState(false)
  return (
    <div className="container-fluid">
      <Header setSearch={setSearch} searchAll={searchAll} setSearchAll={setSearchAll} />
      <div className="row">
        <div style={{ position: 'relative', zIndex: 100, }} className="position-fixed col-11">
          <ContentButton onClick={() => setNavOpen(!navOpen)} />
          { content &&
            <SideNav
              open={navOpen}
              setChapter={changeChapter} 
              content={content}
            />
          }
        </div>
        <div style={{ marginLeft: !navOpen ? '100px' : ''}} className={`transition p-4 ${navOpen ? 'col-9' : 'col-11'} ${navOpen ? 'offset-3' : ''}`}>
        { selectedChapter !== undefined && !(searchAll && search) &&
          <Chapter searchParam={search} chapter={rules.chapters[selectedChapter]} />
        }
        { search && searchAll && 
          < >
          { rules.chapters.map(chapter => {
            return(
              <Chapter key={chapter.title} searchParam={search} chapter={chapter} />
            )
          })
          }
          </>
        }
        </div>
      </div>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')

  const data = await res.text()

  return {
    props: {
      data,
    },
  }
}
