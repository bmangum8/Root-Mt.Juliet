import { useEffect, useState } from "react"
import { Tree } from "./Tree";
import { getAllTrees } from "../../modules/treeManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TreeList = () => {
    const [trees, setTrees] = useState([]);

    const navigate = useNavigate();

    //set state upon rendering
    useEffect(() => {
        getAllTrees().then(setTrees);
    }, []
    );

    const addTreeButton =(e) => {
        e.preventDefault()
        return navigate("/tree/add")
    }

    return (
        <>
        <Button onClick={(clickEvent) => addTreeButton(clickEvent)}>
            Add Tree
        </Button>
        <section>
            {trees.map((tree) => (
                //pass tree as a prop to the tree.js component
                <Tree key={tree.id} tree={tree} />
            ))}
        </section>
        </>
    )
}