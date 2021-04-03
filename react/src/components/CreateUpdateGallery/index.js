import React, { useState, useEffect } from 'react'
import SelectImages from '../SelectImages';
import { RearrangeImages } from '../RearrangeImages';
import CaptionsForm from "../CaptionForm";

import { Steps, Button, notification} from "antd";
import { useDispatch } from 'react-redux';
import './CreateUpdateGallery.css';
import { SERVER_URL } from '../../server_url';
import axios from 'axios';

const TOTAL_STEPS = 3;
const { Step } = Steps;

function CreateUpdateGallery(props) {
    const [curStep, setCurStep] = useState(0); // step 0 == select images, 1 == add captions, 2 == rearrange images
    const reduxDispatch = useDispatch();

    useEffect(() => {
        if (props.match.path === '/update/:id') {
            axios.get(`${SERVER_URL}/django/gallery/${props.match.params.id}`)
                .then(res => {
                    let reduxGallery = res.data.images.map(img => ({url: img.img_url, caption: ""}));
                    reduxDispatch({
                        type: "EDIT_GALLERY",
                        payload: [...reduxGallery]
                    });
                })
                .catch(err => {
                    notification.error({
                        message: "Failed to retrieve galleries from server.",
                        description: `${err.message}`,
                        duration: 0,
                    });
                });
        }
    }, [props.match.path, props.match.params.id, reduxDispatch]);

    function renderStep(step) {
        switch (step) {
            case 0:
                return <SelectImages/>
            case 1:
                return <CaptionsForm/>

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
                    {curStep > 0 ? 
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                        :
                        <Button style={{ margin: '0 8px' }} disabled>
                            Previous
                        </Button>
                    }
                    {curStep < TOTAL_STEPS - 1 ? 
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                        :
                        <Button type="primary" onClick={() => console.log("ADD SUBMIT BUTTON HERE")}>
                            Done
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateUpdateGallery;