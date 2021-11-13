var DockerConfig = [{
  Name: "Pandas",
  Description: "docker.io/amancevice/pandas:1.1.1",
  Policy: "Always",
  Secret: "Image Pull Secret"
},
{
  Name: "PyTorch",
  Description: "docker.io/amancevice/pandas:1.1.1",
  Policy: "Always",
  Secret: "Image Pull Secret"
}
];

export const updateDockerConfig = (elements) => {
  DockerConfig = [...elements];
  }
export const getDockerConfig = () => {
  return DockerConfig;
}
