import React, { useState } from 'react'
import SelectImages from '../SelectImages';
import { RearrangeImages } from '../RearrangeImages';
import { Steps, Button } from "antd";
import './CreateUpdateGallery.css'

const { Step } = Steps;

function CreateUpdateGallery(props) {
    const [curStep, setCurStep] = useState(0); // step 0 == select images, 1 == add captions, 2 == rearrange images

    function renderStep(step) {
        let updateID = props.match.path === '/update/:id' ? props.match.params.id : -1;
        switch (step) {
            case 0:
                return <SelectImages updateID={updateID}/>
            case 1:
                return <div>Add captions</div>
            case 2:
                return <RearrangeImages/>
            default:
                return null;
        }
    
    }

    const next = () => {
        setCurStep(curStep + 1);
    }
    
    const prev = () => {
        setCurStep(curStep - 1);
    };

    return (
        <div>
            <div>
                {props.match.path === '/update/:id' ? `update ${props.match.params.id}` : "create"}
            </div>
            { renderStep(curStep) }
            <div className="steps-nav-container">
                <Steps 
                    current={curStep}
                    className="steps"
                >
                    <Step title="Select images"/>
                    <Step title="Add captions"/>
                    <Step title="Rearrange images"/>
                </Steps>
                <div>
                    {curStep > 0 && 
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    }
                    {curStep < 2 && 
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    }
                    {curStep === 2 && 
                        <Button type="primary" onClick={console.log("cool")}>
                            Done
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateUpdateGallery;