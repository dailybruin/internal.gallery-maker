import React, {useState} from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};





function GalleryBasicInfo() {
  
  const dispatch = useDispatch(); // for changing state
  const data = useSelector((state) => state.editGallery);
 
  console.log(data)

  const fieldsFromRedux = (data) => {
  	const fields_in_form = ["name", "description", "layout"]

  	return fields_in_form.map(f => ({
  		name: [f],
  		value: data[f]
  	}))
  	
  }

  const setReduxFromFields = (allFields) => {
  	for(const field of allFields){
		if(field.name[0] === "name")
		 dispatch({
		  	type: "EDIT_NAME",
		  	payload: field.value
		  })
		else if (field.name[0] === "description")
		  dispatch({
		  	type: "EDIT_DESCRIPTION",
		  	payload: field.value
		  })
		else if (field.name[0] === "layout")
		  dispatch({
		  	type: "EDIT_LAYOUT",
		  	payload: field.value
		  })
	}
  }

  // We need to reformat the data from redux
  // format: an array of field objects
  // field object = {
  //   name: array of names,
  //   value: curr_value  
  // }
  const curr_fields = fieldsFromRedux(data)

  return (
  	<div>
  		<PageHeader
		    title="Basic Info"
		  />,
	    <Form 
	    	{...layout} 
	    	name="control-hooks" 
	    	fields={curr_fields}
		    onFieldsChange={(_, allFields) => {
		    	setReduxFromFields(allFields)
		    }}
	    	>
	      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
	        <Input />
	      </Form.Item>
	      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
	        <TextArea />
	      </Form.Item>
	      <Form.Item name="layout" label="Layout Style" rules={[{ required: true }]}>
	        <Select
	          defaultValue="alt"
	        >
	          <Option value="alt">Alternating</Option>
	          <Option value="bcs">Big Center Stream</Option>
	        </Select>
	      </Form.Item>
	      
	    </Form>
    {/*<pre className="language-bash">{JSON.stringify(curr_fields, null, 2)}</pre>*/}
    </div>
  );
  
};


export default GalleryBasicInfo