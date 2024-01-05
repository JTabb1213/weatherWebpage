import {CircularProgress, Grid, Typography} from "@mui/material";

export default function Progress({title}) {
    return <Grid container direction="column" justifyContent="center" sx={{padding: '20px'}}>
        <Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>
        <Grid item container justifyContent="center">
            <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Grid>
    </Grid>
}