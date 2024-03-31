import "./selector.css";
import classNames from "classnames";
import PropTypes from 'prop-types';

export const Selector = ({ options,
    className,
    id,
    title,
    name,
    required,
    selected,
    disabled,
    value,
    onChange,
    spaceTop,
    spaceBottom,
}) => {
    const {language} = 'english';
    const handleOnChange = (event) => {
        onChange(event.target.value)
    }
    
    return (<>
        <h4>{title}</h4>
        <select
      id={id}
      name={name}
      required={required}
      onChange={handleOnChange}
      value={value}
      defaultValue={selected}
      disabled={disabled}
      className={classNames(
        "select",
        spaceTop && "select--spaceTop",
        spaceBottom && "select--spaceBottom",
        className
      )}
    >
      {options.map(({ id: optionValue, ...option }) => (
        <option key={optionValue} value={optionValue}>
          {option[`name_${language}`] || option.name_en}
        </option>
      ))}
    </select></>
    )
}
Selector.propTypes = {
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    selected: PropTypes.string,
    disabled: PropTypes.bool,
    spaceBottom: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };