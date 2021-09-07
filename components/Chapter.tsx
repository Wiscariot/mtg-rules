import { useEffect, useState } from "react";
import Parse from 'html-react-parser';
import filter from "../helpers/filter";

type Topic = {
  title: string,
  rules: string[]
}

interface ChapterProps {
  chapter:{ 
    title: string,
    rules: string[]
  }
  searchParam: string,
}

type Filtered = () => Topic[];

const Chapter = (props:ChapterProps) => {
  const {chapter, searchParam } = props
  const [filteredRules, setFiltered] = useState<Topic[]>([])
  const [searchedRules, setSearchedRules] = useState<string[]>([])

  const condition = (item:string) => item.charAt(4) === ' ';
  const filtered:Filtered = () => filter(chapter.rules, condition, 4, searchParam) || [];

  useEffect(() => setFiltered(filtered()), [chapter, searchParam]);

  const isSubrule = (rule: string) => {
    const index = rule.slice(0, rule.indexOf(' '));
    return index.match('[a-z]$');
  }

  const isFound = (item:Topic|string) => {

    if(typeof item === "object") {
      return item.title.includes('<mark') || item.rules.some((rule:string) => rule.includes('<mark'))
    } else {
      return item.includes('<mark');
    }
  }

  const topicComponent = (topic:Topic) => {
    const { title, rules } = topic;
    const id = title.split(' ')[0];

    return(
    < >
      <a id={id} className="anchor"/>
      <div 
        key={title} 
        id={title.split(' ')[0]}
        className="glass mb-4 p-3"
        style={{ display: (searchParam && !isFound(topic)) ? 'none' : '' }}
      >
          <h4>
            { searchParam ? Parse(topic.title) : topic.title }
          </h4>
        { topic.rules.map(rule => { 
          const id = rule.split(' ')[0];
          
          return(
            <p 
              id={id} 
              key={rule}
              style={{ 
                display: (searchParam && !isFound(rule)) ? 'none' : '',
                marginLeft: isSubrule(rule) ? '16px' : '', 
                marginTop: !isSubrule(rule) ? '30px' : ''
              }} 
            >
              {searchParam ? Parse(rule) : rule}
            </p>

          )
      })}
      </div>
    </>
    )
  }

return(
  < >
    <a id={chapter.title.split(' ')[0]} className="anchor"></a>
    <h3 style={{ display: filteredRules.some((rule) => isFound(rule)) ? '' : 'none' }}>
      {chapter.title}
    </h3>
    { filteredRules.map((topic:Topic) => topicComponent(topic) )}
  </>
)
}

export default Chapter;