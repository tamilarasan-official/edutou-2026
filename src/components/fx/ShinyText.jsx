/** Text with a soft light sweep moving across it (React Bits "ShinyText" style). */
export default function ShinyText({ as: Tag = 'span', className = '', children, ...rest }) {
  return (
    <Tag className={`edt-shiny ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
