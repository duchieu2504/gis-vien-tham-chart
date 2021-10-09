import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func
};
PostFiltersForm.defaultProps = {
    onSubmit: null
}

function PostFiltersForm(props) {
    const { onSubmit } = props
    const [value, setValue] = useState('')
    const typingTimoutRef = useRef(null)
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue)

        if(!onSubmit) return;

        if(typingTimoutRef.current) {
            clearTimeout(typingTimoutRef.current)
        }
        typingTimoutRef.current = setTimeout(() => {
            const formValue = {
                value: newValue,
            }
            onSubmit(formValue)
        }, 500);
    }
    return (
        <form>
            <input 
            type="text"
            onChange={handleChange}
            value={value}
            />
        </form>
    );
}

export default PostFiltersForm;