import mitt from "mitt";
import { AlertEventModel } from '@/models/alertMessageModel';

export const emitter = mitt<AlertEventModel>();