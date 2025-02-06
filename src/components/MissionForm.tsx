import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getConditions,
  getWeatherConditions,
  getRegions,
  getEquipments,
  getWeapons,
} from "../services/appConfig";
import {
  TextField,
  Checkbox,
  Button,
  Grid,
  Typography,
  Paper,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize,
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
    is_active: false,
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
    Navigate("/get-mission");
    console.log(formData);
  };

  const handleSelection = (path: string, value: number) => {
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
      console.log(`Selected ${path}:`, value);

      return updated;
    });
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
    <form onSubmit={handleSubmit}>
      {currentStep === 1 && (
        <Paper elevation={3} sx={{ p: 4, bgcolor: "background.paper" }}>
          <Typography variant="h4" gutterBottom>
            Mission Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mission Name"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Objective Description"
                value={formData.objectives[0].description}
                onChange={(e) =>
                  handleInputChange(e, "objectives.0.description")
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                value={formData.objectives[0].coordinate.lng}
                onChange={(e) =>
                  handleInputChange(e, "objectives.0.coordinate.lng")
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                value={formData.objectives[0].coordinate.lat}
                onChange={(e) =>
                  handleInputChange(e, "objectives.0.coordinate.lat")
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange(e, "duration")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Weather</Typography>
              <List sx={{display
              : "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2
              }}>
                {weatherConditions.map((weather) => (
                  <ListItem
                    key={weather.id}
                    button
                    selected={formData.weather_id === weather.id}
                    onClick={() => handleSelection("weather_id", weather.id)}
                  >
                    <ListItemText primary={weather.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Condition</Typography>
              <List sx={{display
              : "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2
              }}>
                {conditions.map((condition) => (
                  <ListItem
                    key={condition.id}
                    button
                    selected={formData.condition_id === condition.id}
                    onClick={() =>
                      handleSelection("condition_id", condition.id)
                    }
                  >
                    <ListItemText primary={condition.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Region</Typography>
              <List sx={{display
              : "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2
              }}>
                {regions.map((region) => (
                  <ListItem
                    key={region.id}
                    button
                    selected={formData.region_id === region.id}
                    onClick={() => handleSelection("region_id", region.id)}
                  >
                    <ListItemText primary={region.state} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange(e, "is_active")}
                  />
                }
                label="Is Active"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rules"
                multiline
                rows={4}
                value={formData.rules}
                onChange={(e) => handleInputChange(e, "rules")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {currentStep === 2 && (
        <Paper elevation={3} sx={{ p: 4, bgcolor: "background.paper" }}>
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
                            handleCheckboxChange(0, "equipment_ids", equipment.id)
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
              <Box display="flex" justifyContent="space-between">
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
        <Paper elevation={3} sx={{ p: 4, bgcolor: "background.paper" }}>
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
                            handleCheckboxChange(1, "equipment_ids", equipment.id)
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
              <Box display="flex" justifyContent="space-between">
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
    </form>
  );
};

export default MissionForm;