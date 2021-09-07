import Highlight from "../components/Highlight";

interface FilteredRule<Topic> {
  [id: string]: Topic
}

type Topic = {
  title: string,
  rules: string[]
}

const filter = (rules: string[], condition:(item:any)=>boolean, slice: number, searchParam?:string) => {

  if(rules !==undefined) {
    let filtered:FilteredRule<Topic> = {};
  
    rules.map((rule:string) => {
      const dot = rule.indexOf('.')
      const index = rule.slice(0, slice)
      const isNumber = () => !!Number(rule.charAt(0));     

      if (isNumber() && condition(rule)) {
        rule = searchParam ? Highlight(rule, searchParam) : rule;
        filtered[index] = { title: rule, rules:[] }
      } 
      if(isNumber() && !condition(rule)) {
        rule = searchParam ? Highlight(rule, searchParam) : rule;
        filtered[index].rules.push(rule);
      }
    })
  
    const filteredArr = Object.keys(filtered).map(item => filtered[item])
    return filteredArr;
  }
}

export default filter;