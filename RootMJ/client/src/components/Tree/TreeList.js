import { useEffect, useState } from "react"
import { Tree } from "./Tree";
import { getAllTrees } from "../../modules/treeManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TreeList = ({ isAdmin }) => {
    const [trees, setTrees] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllTrees().then(setTrees);
    }, []
    );

    const addTreeButton = (e) => {
        e.preventDefault()
        return navigate("/tree/add")
    }


    //     <>
    //     <Button onClick={(clickEvent) => addTreeButton(clickEvent)}>
    //         Add Tree
    //     </Button>


        return (
            <section>
                {trees.map((tree) => (
                    //pass tree as a prop to the tree.js component
                    <Tree key={tree.id} tree={tree} />
                ))}
            </section>
        )

    }
// }