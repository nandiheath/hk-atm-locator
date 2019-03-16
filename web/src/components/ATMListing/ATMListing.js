import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ATMItem from './ATMItem';
import HANG_SENG_DATA from '../../data/hang_seng.json';
import HSBC_DATA from '../../data/hsbc.json';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '64px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ATMListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mobileOpen: false,
        allATMs: [],
        hangSengATMs: [],
        hsbcATMs: []
    };
  }

  componentDidMount() {
    const hangSengATMs = HANG_SENG_DATA.data[0].Brand[0].ATM;
    const hsbcATMs = HSBC_DATA.data[0].Brand[0].ATM;
    const allATMs = [...hangSengATMs, ...hsbcATMs];

    this.setState({
        hangSengATMs,
        hsbcATMs,
        allATMs
    });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  renderATMItems = () => {
    const { allATMs } = this.state;
    return allATMs.map((atm, idx) => {
        return (
            <React.Fragment key={idx}>
                <ATMItem atm={atm} idx={idx}/>
                <Divider />
            </React.Fragment>
        );
    });
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <List>
            {this.renderATMItems()}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
    </div>
    );
  }
}

ATMListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ATMListing);