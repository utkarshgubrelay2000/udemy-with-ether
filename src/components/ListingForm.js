import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Row, Col, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap'
import Select from 'react-select'
import { useDropzone } from 'react-dropzone'
import { FormContext } from '../components/FormContext'
import courseGuideStepOneImage from '../../public/content/img/course-guide/course-guide-step-1.jpg';
import courseGuideStepTwoImage from '../../public/content/img/course-guide/course-guide-step-2.jpg';
import courseGuideStepThreeImage from '../../public/content/img/course-guide/course-guide-step-3.jpg';

export default props => {
    const data = props.data
    const [formInputs, setFormInputs] = React.useContext(FormContext);
    const [inputValue, setInputValue] = useState("select");
    const [courseDurationInputValue, setCourseDurationInputValue] = useState("select");

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFormInputs({
                ...formInputs,
                ["files"]: acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }))
            })
        }
    });

    useEffect(() => {
      // console.log("form", formInputs);
    })

    const onChange = (e) => {
        const value = e.target.value;
        setFormInputs({ ...formInputs, [e.target.name]: value })
    };

    // const onCheckboxChange = (e) => {
    //     const value = e.target.value;
    //     setFormInputs({ ...formInputs, [e.target.id]: !value })
    // }

    const onSelectChange = (name, e, label) => {
        if (label === "course duration") {
          setCourseDurationInputValue(e);
        } else {
          setInputValue(e);
        }

        setFormInputs({ ...formInputs, [name]: e });

        if (props.searchKey !== null && (props.searchKey === "" || props.searchKey)) {
          props.setSearchKey(e.value);
        }

        if (props.costStructure) {
          props.setCostStructure(e.value);
        }

        if (e.name === "5<hours" && props.minHours) {
          props.setMinHours(1);
          props.setMaxHours(5);
        }

        if (e.name === "5-10" && props.minHours && props.maxHours) {
          props.setMinHours(5);
          props.setMaxHours(10);
        }

        if (e.name === "10-20" && props.minHours && props.maxHours) {
          props.setMinHours(10);
          props.setMaxHours(20);
        }

        if (e.name === "20-30" && props.minHours && props.maxHours) {
          props.setMinHours(20);
          props.setMaxHours(30);
        }

        if (e.name === "30>hours" && props.minHours) {
          props.setMinHours(30);
        }

        if (props.courseDuration) {
          switch(e.name) {
            case "<1": {
              props.setCourseDuration("<1");
              break;
            };
            case "1-3": {
              props.setCourseDuration("1-3");
              break;
            };
            case "3-6": {
              props.setCourseDuration("3-6");
              break;
            };
            case "6>": {
              props.setCourseDuration("6>");
              break;
            }
          }
        }
    }

    return (

        <Form>
            {data.formBlocks.map(block =>
                <Row  key={block.title} style={{ position: 'relative', width: '100%' }}>
                  <Col lg="4">
                    {
                      props.searchKey !== null && (props.searchKey === "" || props.searchKey) &&
                      <img
                        src={courseGuideStepOneImage}
                        className="img-fluid embed-responsive-item"
                        style={{ borderRadius: 5, position: 'relative', top: '-5%', left: '-5%' }}
                      />
                    }
                    {
                      props.costStructure === "" &&
                      <img
                        src={courseGuideStepTwoImage}
                        className="img-fluid embed-responsive-item"
                        style={{ borderRadius: 5 }}
                      />
                    }
                    {
                      props.minHours && props.maxHours &&
                      <img
                        src={courseGuideStepThreeImage}
                        className="img-fluid embed-responsive-item"
                        style={{ borderRadius: 5 }}
                      />
                    }
                    </Col>
                    <Col lg="3"></Col>
                    <Col
                        lg={"5"}
                        className="m-auto"
                    >
                        {block.inputs.map((input, index) =>
                            <React.Fragment key={index}>
                                {input.type === "text" &&
                                    <FormGroup>
                                        <Label
                                            className="form-label"
                                            for={input.name}
                                        >
                                            {input.label}
                                        </Label>
                                        <Input
                                            type={input.type}
                                            input={input.name}
                                            name={input.name}
                                            id={input.name}
                                            value={formInputs[input.name] || ''}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </FormGroup>
                                }
                                {/* {input.type === "textarea" &&
                                    <FormGroup className="mb-5">
                                        <Label
                                            className="form-label"
                                            for={input.name}
                                        >
                                            {input.label}
                                        </Label>
                                        <Input
                                            type={input.type}
                                            rows="5"
                                            input={input.name}
                                            name={input.name}
                                            id={input.name}
                                            value={formInputs[input.name] || ''}
                                            onChange={(e) => onChange(e)}
                                            aria-describedby={input.helpId}
                                        />
                                        <small id={input.helpId} className="form-text text-muted mt-2">
                                            {input.help}
                                        </small>
                                    </FormGroup>
                                } */}
                        
                                {input.type === "select" &&
                                    <FormGroup style={courseDurationInputValue ? { position: 'relative', left: '5%'} : {}} >
                                        <Label
                                            className="form-label"
                                            for={input.name}
                                        >
                                            {input.label}
                                        </Label>
                                        <Select
                                            id={input.name}
                                            name={input.name}
                                            options={input.options}
                                            className="selectpicker"
                                            classNamePrefix="selectpicker"
                                            value={input.label === "course duration" ? courseDurationInputValue : inputValue}
                                            onChange={(e) => onSelectChange(input.name, e, input.label)}

                                        />
                                        {input.text &&
                                            <small
                                                id="propertyTypeHelp"
                                                className="form-text text-muted"
                                            >
                                                {input.text}
                                            </small>
                                        }
                                    </FormGroup>
                                }
                                {/* {input.type === "radios" &&
                                    <FormGroup>
                                        <Label className="form-label">
                                            {input.label}
                                        </Label>

                                        {input.radios.map(radio =>
                                            <CustomInput
                                                key={radio.label}
                                                type="radio"
                                                id={radio.id}
                                                name={radio.name}
                                                value={radio.id}
                                                onChange={(e) => onChange(e)}
                                                checked={formInputs[radio.name] === radio.id}
                                                label={radio.label}
                                            />
                                        )}

                                    </FormGroup>
                                } */}
                                {/* {input.type === "form-group" &&
                                    <Row>
                                        {input.inputs.map(input =>
                                            <Col md={input.col} key={input.name}>
                                                <FormGroup>
                                                    <Label
                                                        for={input.name}
                                                        className="form-label">
                                                        {input.label}
                                                    </Label>
                                                    <Input
                                                        name={input.name}
                                                        id={input.name}
                                                        value={formInputs[input.name] || ''}
                                                        onChange={(e) => onChange(e)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        )}
                                    </Row>

                                }
                                {input.type === "buttons" &&
                                    <Row>
                                        {input.buttons.map(button =>
                                            <Col lg="4" key={button.name}>
                                                <Label className="form-label">
                                                    {button.label}
                                                </Label>
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        color="items"
                                                        className="btn-item-decrease"
                                                        onClick={(e) => onButtonDecrease(e, button.name)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Input
                                                        name={button.name}
                                                        value={formInputs[button.name] || 1}

                                                        disabled
                                                        className="input-items"
                                                    />
                                                    <Button
                                                        color="items"
                                                        className="btn-item-increase"
                                                        onClick={(e) => onButtonIncrease(e, button.name)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>

                                }
                                {input.type === "checkboxes" &&
                                    <FormGroup>
                                        <Label className="form-label">
                                            {input.label}
                                        </Label>
                                        <ul className="list-inline mb-0">
                                            {input.checkboxes.map(checkbox =>
                                                <li key={checkbox.id} className="list-inline-item">
                                                    <CustomInput
                                                        type="checkbox"
                                                        id={checkbox.id}
                                                        name={checkbox.name}
                                                        value={formInputs[checkbox.id] || ''}
                                                        onChange={(e) => onCheckboxChange(e)}
                                                        label={checkbox.label}
                                                        className="text-muted"
                                                    />
                                                </li>
                                            )}
                                        </ul>

                                    </FormGroup>
                                } */}
                                {/* {input.type === "upload" &&
                                    <FormGroup>
                                        <div {...getRootProps({ className: 'dropzone dz-clickable' })}>
                                            <input {...getInputProps()} />
                                            <div className="dz-message text-muted">
                                                <p>Drop files here or click to upload.</p>
                                                <p><span className="note">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span></p>
                                            </div>
                                        </div>
                                        <Row className="mt-4">
                                            {formInputs["files"] && formInputs["files"].map(file =>
                                                <div key={file.name} className="col-lg-4">
                                                    <div>
                                                        <img
                                                            src={file.preview}
                                                            className="img-fluid rounded shadow mb-4"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Row>

                                    </FormGroup>
                                } */}
                            </React.Fragment>

                        )}
                    </Col>
                </Row>

            )}
            <Row className="form-block flex-column flex-sm-row">
                <Col className="text-center text-sm-left">
                    {props.prevStep &&
                        <Link href={props.prevStep} passHref>
                            <Button color="link" className="text-muted">
                                <i className="fa-chevron-left fa mr-2" />
                                Back
                            </Button>
                        </Link>

                    }
                </Col>
                <Col className="text-center text-sm-right">
                    {props.nextStep &&
                        <Link href={props.nextStep} passHref>
                            <Button color="primary" className="px-3">
                              {props.lastStep ? "See results" : "Next step"}
                                <i className="fa-chevron-right fa ml-2" />
                            </Button>
                        </Link>
                    }
                    {props.finish &&
                        <Link href={props.finish} passHref>
                            <Button color="primary" className="px-3">
                                Finish
                                <i className="fa-chevron-right fa ml-2" />
                            </Button>
                        </Link>
                    }
                </Col>
            </Row>
        </Form>

    )
}
