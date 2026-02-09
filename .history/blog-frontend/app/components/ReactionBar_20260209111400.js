"use client";

import { useRouter } from "next/navigation/";
import { useAuth } from "../context/AuthContext";
import { reactionsApi } from "../../lib/api";

const REACTIONS=["like","love","clap","insightful"]
