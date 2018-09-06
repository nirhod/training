import * as React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

interface OwnProps {
  route: string;
  children: string | React.ReactNode;
  onClick?: (event: React.PointerEvent<HTMLAnchorElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface DispatchProps {
  push: (url: string) => void;
}

type LinkProps = OwnProps & DispatchProps;

class Link extends React.Component<LinkProps> {
  onClick = (event: React.PointerEvent<HTMLAnchorElement>) => {
    // Disable href routing.
    event.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(event);
    }
    this.props.push(this.props.route);
  };

  render() {
    return (
      <a
        style={this.props.style}
        className={this.props.className}
        href={this.props.route}
        onClick={(event: React.PointerEvent<HTMLAnchorElement>) => this.onClick(event)}
      >
        {this.props.children}
      </a>
    );
  }
}

const ConnectedLink = connect<void, DispatchProps>(
  () => ({}),
  {
    push: pushAction,
  },
)(Link);
export { ConnectedLink as Link };
