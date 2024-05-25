import React from 'react';
import { Button, Modal } from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

export const systemInfo = () => {
    Modal.info({
        width: "800px",
        title: 'System Code Docs',
        content: (
            <div>
                <Title level={4}>
                    Axiom [Required]
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    The initial state of the l-system.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .axiom(AxiomString)
                </Paragraph>

                <Title level={4}>
                    Rule [Optional]
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    The mapping of a character in the current state to a string in the next state.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .map(FromChar).to(ToString)
                </Paragraph>
            </div>
        ),
        onOk() {}
    });
};

export const drawInfo = () => {
    Modal.info({
        width: "800px",
        title: 'Draw Code Docs',
        content: (
            <div style={{ height: "60vh", overflowY: "scroll" }}>
                <Title level={4}>
                    Variables
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    Values usable during turtle drawing.
                    <br/>
                    Variables x, y, z, yaw, pitch, roll are default, and represent the current position and orientation (with respect to each axis) of the turtle.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .let(VariableNameString)
                    <br/>
                    .eq(InitialValue)
                </Paragraph>

                <Title level={4}>
                    Character Instructions
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    The instructions performed when a character is seen in the L-System's String.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .on(Character)
                    <br/>
                    [Insert Instruction Chain]
                </Paragraph>

                <Title level={4}>
                    Draw Line Instruction
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    The turtle moves forward in the direction it is facing, drawing a line of the desired length and color.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .draw_line
                    <br/>
                    .len(NumericValue | VariableNameString)
                    <br/>
                    .color(NumericValue | VariableNameString)
                </Paragraph>

                <Title level={4}>
                    Set Instruction
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    Set the value of a variable by setting a new value, adding to the current value, or providing a custom update method.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .set(SetVariableNameString)
                    <br/>
                    {`{`}
                    <div style={{ marginLeft: 12 }}>
                        .to(NumericValue | VariableNameString)
                        <br/>
                        | .add(NumericValue | VariableNameString)
                        <br/>
                        | {`{ .with(VariableNameString) }*`}
                        <br/>
                        &nbsp; .via(SetFunction: {`(SetVariableValue, ...WithVariableValues) => NewValue`})
                    </div>
                    {`}`}
                </Paragraph>

                <Title level={4}>
                    Push Instruction
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    Push a variable or all variables to the turtle's stack.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .push(VariableNameString)
                    <br/>
                    | .push_all
                </Paragraph>

                <Title level={4}>
                    Pop Instruction
                </Title>
                <Title level={5}>
                    Definition
                </Title>
                <Paragraph>
                    Pop a value or all values from top of the turtle's stack into the given variable.
                </Paragraph>
                <Title level={5}>
                    How to Add
                </Title>
                <Paragraph>
                    .pop(VariableNameString)
                    <br/>
                    | .pop_all
                </Paragraph>
            </div>
        ),
        onOk() {},
    });
};

const DocModal = ({
    info
}) => {
    return (
        <Button
            onClick={info}
            icon={<InfoOutlined />}
            shape="circle"
            size="small"
        />
    )
};

export default DocModal;