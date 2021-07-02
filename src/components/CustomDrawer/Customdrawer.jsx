import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

export default function SwipeableTemporaryDrawer({ toggleDrawer, openDrawer, position, children, width }) {
	const useStyles = makeStyles({
		root: {
			'& .MuiDrawer-paperAnchorRight': {
				width: width ? width : '65%',
			},
			
		},
		list: {
			width: 'auto',
		},
	});

	const classes = useStyles();

	const list = () => (
		<div
			className={clsx(classes.list)}
			role="presentation"
		>
			{children}
		</div>
	);

	return (
		<div style={{ backgroundColor: "rgba(255,255,255,.62)"}}>
			<React.Fragment>
				<SwipeableDrawer
					className={classes.root}
					anchor={position ? position : 'right'}
					open={openDrawer}
					onClose={(e) => {
						toggleDrawer(false, e);
					}}
					onOpen={(e) => {
						toggleDrawer(true, e);
					}}
				>
					{list()}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}
