import Card2 from "./SectionSupCard"
export default function Carrousel2(props){
    const styleToApply = props.useGrid ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 350px)',
        gridTemplateRows: 'repeat(2, 350px)',
        marginLeft: '130px'
      } : {
        display: 'flex',
        justifyContent: 'flex-Start',
        marginLeft: '50px'
      }
    return <div style={styleToApply}>
        {
            props.data.map((obj)=>{
                return <Card2 key={obj.id} content={obj.imagen} nombre={obj.nombre} id={obj.id}/>
            })
        }
    </div>
}