
export interface KnownPlatform {
  name: string;
  type: string;
  patterns: string[];
  ports: number[];
  endpoints: string[];
}

export const knownPlatforms: KnownPlatform[] = [
  {
    name: "Careport WellSky",
    type: "careport", 
    patterns: ["careport", "wellsky", "care-port"],
    ports: [443, 80, 8080, 8443],
    endpoints: ["/api/referrals", "/careport", "/wellsky", "/api/v1"]
  },
  {
    name: "Profility",
    type: "profility",
    patterns: ["profility", "prof-ility"],
    ports: [443, 80, 8080],
    endpoints: ["/api/referral", "/profility", "/api/v2"]
  },
  {
    name: "Reside",
    type: "reside",
    patterns: ["reside", "reside-platform"],
    ports: [443, 80],
    endpoints: ["/api/referrals", "/reside", "/api"]
  },
  {
    name: "Epic MyChart",
    type: "epic",
    patterns: ["mychart", "epic"],
    ports: [443, 80],
    endpoints: ["/mychart", "/api/epic", "/interconnect-prd-oauth2"]
  },
  {
    name: "Cerner PowerChart",
    type: "cerner",
    patterns: ["powerchart", "cerner"],
    ports: [443, 80],
    endpoints: ["/powerchart", "/cerner", "/api/fhir"]
  }
];
