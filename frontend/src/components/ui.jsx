import{Link}from'react-router-dom';import{ArrowUpRight,Code2,LoaderCircle,ShieldCheck,Sparkles}from'lucide-react';
export function Brand({light=false}){return <Link className={`brand ${light?'brand-light':''}`} to="/"><span><Code2 size={18}/></span>review<span className="brand-mark-text">.ai</span></Link>;}
export function Spinner({text='Loading'}){return <span className="spinner"><LoaderCircle className="spin" size={16}/>{text}</span>;}
export function Notice({children}){return <div className="notice"><ShieldCheck size={15}/><span>{children}</span></div>;}
export function Score({value=0,small=false}){const score=Math.max(0,Math.min(100,value));return <div className={`score-ring ${small?'score-small':''}`} style={{'--score':`${score*3.6}deg`}}><b>{score}</b><small>/100</small></div>;}
export function Finding({item}){return <article className="finding"><div><h4>{item.title}</h4><span className={`severity severity-${item.severity}`}>{item.severity}</span></div><p>{item.description}</p>{item.line&&<small>Line {item.line}</small>}</article>;}
export function Empty({title,copy,action}){return <div className="empty"><span><Sparkles size={20}/></span><h3>{title}</h3><p>{copy}</p>{action}</div>;}
export function SectionLink({to,children}){return <Link className="section-link" to={to}>{children}<ArrowUpRight size={14}/></Link>;}
