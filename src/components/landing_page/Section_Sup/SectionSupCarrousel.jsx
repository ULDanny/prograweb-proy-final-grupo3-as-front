import Card from "./SectionSupCard"
export default function Carrousel(props){
    const styleToApply = props.useGrid ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 450px)',
        gridTemplateRows: 'repeat(4, 450px)'
      } : {
        display: 'flex',
        justifyContent: 'flex-Start'
      }
    return <div style={styleToApply}>
        {
            props.data.map((obj)=>{
                return <Card key={obj.id} content={obj.imagen} nombre={obj.nombre} id={obj.id}/>
            })
        }
    </div>
}