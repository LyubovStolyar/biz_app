
interface Props {
    text?: string;
    children?: React.ReactNode;
}

function Title(props: Props) {
    return ( 


        <div className="">{props.children}</div>

     );
}

export default Title;