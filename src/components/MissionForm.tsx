import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import FormHeader from "./FormHeader";
import {
  getConditions,
  getWeatherConditions,
  getRegions,
  getEquipments,
  getWeapons,
  createMission,
} from "../services/appConfig";
import {
  TextField,
  Checkbox,
  Button,
  Grid,
  Typography,
  Paper,
  FormControlLabel,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

const MissionForm: React.FC = () => {
  const Navigate = useNavigate();
  const [weatherConditions, setWeatherConditions] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [conditions, setConditions] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [regions, setRegions] = useState<
    { id: number; state: string; description: string }[]
  >([]);

  const [equipments, setEquipments] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [weapons, setWeapons] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [anchorElWeather, setAnchorElWeather] = useState<null | HTMLElement>(
    null
  );
  const [anchorElCondition, setAnchorElCondition] =
    useState<null | HTMLElement>(null);
  const [anchorElRegion, setAnchorElRegion] = useState<null | HTMLElement>(
    null
  );

  const handleClickDropdown = (
    event: React.MouseEvent<HTMLElement>,
    type: "weather" | "condition" | "region"
  ) => {
    if (type === "weather") setAnchorElWeather(event.currentTarget);
    else if (type === "condition") setAnchorElCondition(event.currentTarget);
    else if (type === "region") setAnchorElRegion(event.currentTarget);
  };

  const handleCloseDropdown = (type: "weather" | "condition" | "region") => {
    if (type === "weather") setAnchorElWeather(null);
    else if (type === "condition") setAnchorElCondition(null);
    else if (type === "region") setAnchorElRegion(null);
  };

  const handleSelection = (path: string, value: number) => {
    setFormData((prev) => ({ ...prev, [path]: value }));
  };

  useEffect(() => {
    const fetchWeatherConditions = async () => {
      try {
        const response = await getWeatherConditions();
        if (response && response.data) {
          setWeatherConditions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching weather conditions:", error);
      }
    };

    const fetchConditions = async () => {
      try {
        const response = await getConditions();
        if (response && response.data) {
          setConditions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        if (response && response.data) {
          setRegions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const response = await getEquipments();
        if (response && response.data) {
          setEquipments(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };

    const fetchWeapons = async () => {
      try {
        const response = await getWeapons();
        if (response && response.data) {
          setWeapons(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };

    fetchWeatherConditions();
    fetchConditions();
    fetchRegions();
    fetchEquipments();
    fetchWeapons();
  }, []);

  const [formData, setFormData] = useState({
    mission_type_id: 1,
    weather_id: 1,
    condition_id: 1,
    region_id: 1,
    mission_status_id: 1,
    avatar:
      "https://res.cloudinary.com/delino12/image/upload/v1736368756/army_image.webp",
    name: "",
    duration: "",
    is_active: true,
    rules: "",
    objectives: [
      {
        description: "",
        coordinate: {
          lng: "",
          lat: "",
        },
      },
    ],
    participants: [
      {
        team_id: 1,
        name: "",
        weapon_ids: [] as number[],
        equipment_ids: [] as number[],
        coordinate: {
          lng: "",
          lat: "",
        },
      },
      {
        team_id: 2,
        name: "",
        weapon_ids: [] as number[],
        equipment_ids: [] as number[],
        coordinate: {
          lng: "",
          lat: "",
        },
      },
    ],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    path: string
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let temp: any = updated;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });
      return updated;
    });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data before sending:", formData);

    createMission(formData)
      .then((response: { status: boolean; message: string }) => {
        if (response?.status) {
          console.log("Mission created successfully:", response.message);
          Navigate("/get-mission");
        } else {
          console.error("Unexpected API response:", response);
        }
      })
      .catch((error) => {
        console.error("Error creating mission:", error);
      });

    // e.preventDefault();
    // Navigate("/get-mission");
    // console.log(formData);
  };

  const handleCheckboxChange = (
    teamIndex: number,
    type: "weapon_ids" | "equipment_ids",
    id: number
  ) => {
    setFormData((prev) => {
      const updatedParticipants = [...prev.participants];
      const currentArray = updatedParticipants[teamIndex][type];
      if (currentArray.includes(id)) {
        updatedParticipants[teamIndex][type] = currentArray.filter(
          (item) => item !== id
        );
      } else {
        updatedParticipants[teamIndex][type] = [...currentArray, id];
      }
      return { ...prev, participants: updatedParticipants };
    });
  };

  const isChecked = (
    teamIndex: number,
    type: "weapon_ids" | "equipment_ids",
    id: number
  ) => formData.participants[teamIndex][type].includes(id);

  return (
    <form className="bg-black" onSubmit={handleSubmit}>
      <FormHeader />
      {currentStep === 1 && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: "black",
            color: "white",
            borderRadius: "0px",
            padding: "7% 2%",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Create Mission
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Grid
                container
                spacing={3}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 1.45,
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mission Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Objective Description"
                    value={formData.objectives[0].description}
                    onChange={(e) =>
                      handleInputChange(e, "objectives.0.description")
                    }
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Longitude"
                    value={formData.objectives[0].coordinate.lng}
                    onChange={(e) =>
                      handleInputChange(e, "objectives.0.coordinate.lng")
                    }
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Latitude"
                    value={formData.objectives[0].coordinate.lat}
                    onChange={(e) =>
                      handleInputChange(e, "objectives.0.coordinate.lat")
                    }
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Duration (minutes)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange(e, "duration")}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Select Weather</Typography>
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickDropdown(e, "weather")}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      justifyContent: "flex-start",
                    }}
                  >
                    {weatherConditions.find((w) => w.id === formData.weather_id)
                      ?.name || "Select Weather"}
                  </Button>
                  <Menu
                    anchorEl={anchorElWeather}
                    open={Boolean(anchorElWeather)}
                    onClose={() => handleCloseDropdown("weather")}
                  >
                    {weatherConditions.map((weather) => (
                      <MenuItem
                        key={weather.id}
                        selected={formData.weather_id === weather.id}
                        onClick={() => {
                          handleSelection("weather_id", weather.id);
                          handleCloseDropdown("weather");
                        }}
                      >
                        {weather.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Select Condition</Typography>
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickDropdown(e, "condition")}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      justifyContent: "flex-start",
                    }}
                  >
                    {conditions.find((c) => c.id === formData.condition_id)
                      ?.name || "Select Condition"}
                  </Button>
                  <Menu
                    anchorEl={anchorElCondition}
                    open={Boolean(anchorElCondition)}
                    onClose={() => handleCloseDropdown("condition")}
                  >
                    {conditions.map((condition) => (
                      <MenuItem
                        key={condition.id}
                        selected={formData.condition_id === condition.id}
                        onClick={() => {
                          handleSelection("condition_id", condition.id);
                          handleCloseDropdown("condition");
                        }}
                      >
                        {condition.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Select Region</Typography>
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickDropdown(e, "region")}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      justifyContent: "flex-start",
                    }}
                  >
                    {regions.find((r) => r.id === formData.region_id)?.state ||
                      "Select Region"}
                  </Button>
                  <Menu
                    anchorEl={anchorElRegion}
                    open={Boolean(anchorElRegion)}
                    onClose={() => handleCloseDropdown("region")}
                  >
                    {regions.map((region) => (
                      <MenuItem
                        key={region.id}
                        selected={formData.region_id === region.id}
                        onClick={() => {
                          handleSelection("region_id", region.id);
                          handleCloseDropdown("region");
                        }}
                      >
                        {region.state}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.is_active}
                        onChange={(e) => handleInputChange(e, "is_active")}
                        sx={{ color: "white" }}
                      />
                    }
                    label="Is Active"
                  />
                </Grid> */}
                <Grid item xs={12} sx={{ gridColumn: "span 2" }}>
                  <TextField
                    fullWidth
                    label="Rules"
                    multiline
                    rows={4}
                    value={formData.rules}
                    onChange={(e) => handleInputChange(e, "rules")}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white", color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundImage:
                    "url(https://res.cloudinary.com/delino12/image/upload/v1736368756/army_image.webp)",
                }}
                className="w-full text-black bg-cover bg-center flex-grow h-[100vh] shadow flex justify-center items-center"
              >
                <div className="flex flex-col bg-black w-96 py-2 opacity-70 text-white text-center">
                  <h1 className="text-4xl font-bold">BORNO SURGENT CAMP</h1>
                  <p className="text-2xl">SAMBISA</p>
                  <div className="flex items-center justify-center rounded-full">
                    <div className="animate-spin rounded-full border-t-2 border-white border-solid h-5 w-3"></div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      )}

      {currentStep === 2 && (
        <Paper
          elevation={3}
          sx={{ p: 4, bgcolor: "black", color: "white", padding: "7% 2%" }}
        >
          <Typography variant="h4" gutterBottom>
            Team 1 Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Team Name"
                value={formData.participants[0].name}
                onChange={(e) => handleInputChange(e, "participants.0.name")}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                value={formData.participants[0].coordinate.lng}
                onChange={(e) =>
                  handleInputChange(e, "participants.0.coordinate.lng")
                }
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                value={formData.participants[0].coordinate.lat}
                onChange={(e) =>
                  handleInputChange(e, "participants.0.coordinate.lat")
                }
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Weapons</Typography>
              <Grid container spacing={2}>
                {weapons.map((weapon) => (
                  <Grid item key={weapon.id} xs={12} sm={6} md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(0, "weapon_ids", weapon.id)}
                          onChange={() =>
                            handleCheckboxChange(0, "weapon_ids", weapon.id)
                          }
                        />
                      }
                      label={weapon.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Equipments</Typography>
              <Grid container spacing={2}>
                {equipments.map((equipment) => (
                  <Grid item key={equipment.id} xs={12} sm={6} md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(0, "equipment_ids", equipment.id)}
                          onChange={() =>
                            handleCheckboxChange(
                              0,
                              "equipment_ids",
                              equipment.id
                            )
                          }
                        />
                      }
                      label={equipment.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="left" gap={2}>
                <Button variant="contained" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {currentStep === 3 && (
        <Paper
          elevation={3}
          sx={{ p: 4, bgcolor: "black", color: "white", padding: "7% 2%" }}
        >
          <Typography variant="h4" gutterBottom>
            Team 2 Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Team Name"
                value={formData.participants[1].name}
                onChange={(e) => handleInputChange(e, "participants.1.name")}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                value={formData.participants[1].coordinate.lng}
                onChange={(e) =>
                  handleInputChange(e, "participants.1.coordinate.lng")
                }
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                value={formData.participants[1].coordinate.lat}
                onChange={(e) =>
                  handleInputChange(e, "participants.1.coordinate.lat")
                }
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Weapons</Typography>
              <Grid container spacing={2}>
                {weapons.map((weapon) => (
                  <Grid item key={weapon.id} xs={12} sm={6} md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(1, "weapon_ids", weapon.id)}
                          onChange={() =>
                            handleCheckboxChange(1, "weapon_ids", weapon.id)
                          }
                        />
                      }
                      label={weapon.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Equipments</Typography>
              <Grid container spacing={2}>
                {equipments.map((equipment) => (
                  <Grid item key={equipment.id} xs={12} sm={6} md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(1, "equipment_ids", equipment.id)}
                          onChange={() =>
                            handleCheckboxChange(
                              1,
                              "equipment_ids",
                              equipment.id
                            )
                          }
                        />
                      }
                      label={equipment.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="left" gap={2}>
                <Button variant="contained" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Footer />
    </form>
  );
};

export default MissionForm;
