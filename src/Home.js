import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { color } from "@mui/system";

function Home() {
  var [songDetails, setSongDetails] = useState({ name: "test" });
  var [songSelected, setSongSelected] = useState(false);
  var [openPlaylist, setOpenPlaylist] = useState(false);
  var [playlist, setPlayList] = useState([]);
  var [tamilsong, setTamilSong] = React.useState([]);
  var [englishsong, setEnglishSong] = useState([]);
  var [telugusong, setTeluguSong] = useState([]);
  var [search, setSearch] = useState({ search: "" });
  var [opensearch, setopensearch] = useState(false);
  const navigate = useNavigate();
  var [find, setFind] = useState([]);
  // var [check, setCheck] = useState(true);

  const playSong = (songDetails) => {
    setSongDetails(songDetails);

    setSongSelected(true);
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    console.log("working");
    e.filter((f) => {
      f.toLowerCase();
    });
  };

  /* useEffect to fetch data from the data base */

  useEffect(() => {
    // toast.success("Successfully Logged in")
    function songarray(songs) {
      /* splitting songs based on language */
      songs.forEach((song) => {
        if (song.Language === "Tamil") {
          setTamilSong([...tamilsong], tamilsong.push(song));
        } else if (song.Language === "Telugu") {
          setTeluguSong([...telugusong], telugusong.push(song));
        } else if (song.Language === "English") {
          setEnglishSong([...englishsong], englishsong.push(song));
        }
      });
    }
    axios
      .get("https://backend-musicplayer.herokuapp.com/song/getsong")
      .then((res) => {
        songarray(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  const handleremove = (song) => {
    var temp = playlist;
    temp.splice(temp.indexOf(song), 1);
    setPlayList(temp);
    // console.log(song);
    // setCheck(true);
  };

  /* playList handling */
  const handlePlayList = (song) => {
    var temp = playlist;
    if (!temp.includes(song)) {
      temp.push(song);

      setPlayList(temp);
    }
    // setCheck(false);
  };

  /* Display song based on song language as a Function call */
  const showsong = (song) => {
    return (
      <Grid item key={song._id}>
        <div>
          <Card
            sx={{ maxWidth: 300, minWidth: 300, minHeight: 250 }}
            className="mouse"
          >
            <CardMedia
              onClick={() => {
                playSong(song);
              }}
              component="img"
              height="200"
              image={song.img}
              alt={song.name}
            />
            <CardContent
              onClick={() => {
                playSong(song);
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {song.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {song.lyrics}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  playSong(song);
                }}
              >
                Play
              </Button>
              {!playlist.includes(song) ? (
                <Button
                  size="small"
                  onClick={() => {
                    handlePlayList(song);
                  }}
                >
                  Add to Playlist
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleremove(song);
                  }}
                >
                  Remove
                </Button>
              )}
            </CardActions>
          </Card>
        </div>
      </Grid>
    );
  };

  /* Home Return Starts Here  */
  return (
    <div className="home">
      {localStorage.getItem("token") != null && (
        <div>
          {/* App Bar for Music Application */}
          <AppBar
            sx={{ height: "80px" }}
            position="static"
            style={{ backgroundColor: "black", opacity: "0.7" }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  name="search"
                  value={search.search}
                  className="white"
                  onChange={(e) => handleChange(e)}
                />{" "}
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  className="white"
                  style={{ marginTop: "29px" }}
                  onClick={() => {
                    setopensearch(true);
                  }}
                >
                  Search
                </Button>
              </div>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  padding: 4,
                  display: { xs: "none", sm: "block" },
                }}
              >
                MusicPlayer
              </Typography>

              {!openPlaylist && (
                <Button
                  style={{ color: "red" }}
                  onClick={() => {
                    setOpenPlaylist(true);
                  }}
                >
                  PlayList
                </Button>
              )}

              {(openPlaylist || opensearch) && (
                <Button
                  style={{ color: "red" }}
                  onClick={() => {
                    setOpenPlaylist(false);
                    setopensearch(false);
                  }}
                >
                  Home
                </Button>
              )}
              <Button
                variant="h6"
                // noWrap
                component="div"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                LogOut
              </Button>
            </div>
          </AppBar>

          {/* Condition for Displaying songs in Grid  Home Page , Playlist ,Search*/}
          <Grid
            alignContent="center"
            justifyContent="center"
            container
            style={{ marginTop: 10 }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {}
            {!openPlaylist && !opensearch && (
              <Grid item style={{ width: "100vw" }}>
                <h2 style={{color:"white"}}>Tamil Songs</h2>
              </Grid>
            )}

            {/* show song indicates cards per iteration */}
            {!openPlaylist &&
              !opensearch &&
              tamilsong.map((song) => {
                return showsong(song);
              })}

            {!openPlaylist && !opensearch && (
              <Grid item style={{ width: "100vw" }}>
                <h2 style={{color:"white"}}>Telugu Songs</h2>
              </Grid>
            )}
            {!openPlaylist &&
              !opensearch &&
              telugusong?.map((song) => {
                return showsong(song);
              })}

            {!openPlaylist && !opensearch && (
              <Grid item style={{ width: "100vw" }}>
                <h2 style={{color:"white"}}>English Songs</h2>
              </Grid>
            )}
            {!openPlaylist &&
              !opensearch &&
              englishsong?.map((song) => {
                return showsong(song);
              })}

            {/* playlist Funcationality */}
            {openPlaylist &&
              !opensearch &&
              playlist?.map((song) => {
                return (
                  <Grid item key={song._id}>
                    <Card
                      sx={{ maxWidth: 345, minWidth: 300, minHeight: 250 }}
                      onClick={() => {
                        playSong(song);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={song.img}
                        alt={song.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {song.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {song.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Play</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}

            {/* search functionality */}
            {!openPlaylist &&
              opensearch &&
              find?.map((song) => {
                return (
                  <Grid item key={song._id}>
                    <Card
                      sx={{ maxWidth: 345, minWidth: 300, minHeight: 250 }}
                      onClick={() => {
                        playSong(song);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={song.img}
                        alt={song.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {song.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {song.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Play</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>

          {/* Modal for popup while Clicking a song */}
          <Modal
            open={songSelected}
            onClose={() => {
              setSongSelected(false);
            }}
            style={{ backgroundColor: "", margin: "10% 30%" }}
            className="app"
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {/* Card content for Song */}
              <Card
                sx={{ maxWidth: 300, minWidth: 350, minHeight: 250 }}
                style={{ textAlign: "center" }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={songDetails.img}
                  alt={songDetails.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Album:{songDetails.name}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Language: {songDetails.Language}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Artists: {songDetails.Artist}
                  </Typography>
                </CardContent>

                <audio
                  src={songDetails?.path}
                  style={{ width: "100%" }}
                  controls
                  autoPlay
                />
              </Card>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Home;
