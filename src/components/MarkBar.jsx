import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Col } from "react-bootstrap";
import '../index.css'

const MarkBar = observer(() => {
    const { product } = useContext(Context);

    // через мэп отрисовываем все метки
    // и выделяем активную

    return (
        <Row className="d-flex flex-wrap">
            {product.marks.map(mark => (
                <Col  key={mark.id} xs="auto">
                    <Card className='MarkBtn'
                        style={{ cursor: 'pointer'}}
                        onClick={() => product.setSelectedMark(mark)}
                        border={mark.id === product.selectedMark.id}
                    >
                        {mark.name}
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default MarkBar;
