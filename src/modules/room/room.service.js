import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import {
  convertFileNameWithPdfExt,
  convertFileNameWithWebpExt,
  convertImgArrayToObject,
  convertObjOriginalImgNameWithWebpExt,
  uploadWorker,
} from '../../middleware/upload/index.js';
import isArrayElementExist from '../../utils/isArrayElementExist.js';
import roomRepository from './room.repository.js';
import { isMainThread } from 'worker_threads';

class RoomService extends BaseService {
	#repository;
	constructor(repository, serviceName) {
		super(repository, serviceName);
		this.#repository = repository;
	}

	async createRoom(payload) {
		console.log(payload)
		const feature = await this.#repository.createRoom(payload,);
		return feature;
	}


	async getAllRoom(query) {
		const feature = await this.#repository.getAllRoom(query);
		return feature;
	}

	async getSingleRoom(id) {
        const feature = await this.#repository.getSingleRoom(id);
        if (!feature) throw new NotFoundError(` room not found by id`);
        return feature;
    }

	async deleteRoom(id) {
        const room = await this.#repository.deleteRoom(id);
        if (!room) throw new NotFoundError(` feature not found by id`);
        return room;
    }

	async updateRoom(payload) {
		const room = await this.#repository.updateRoom(payload);
		return room;
	}

	async updateRoomStatus(officeId, query) {
        let featureObj = {};
        if (query?.status) {
          featureObj.status = parseInt(query?.status);
        }
        const featureUpdate = await this.#repository.updateById(officeId, featureObj);
        if (featureUpdate[0] <= 0) throw new NotFoundError('Room not found by id');
        return featureUpdate;
      }
}

export default new RoomService(roomRepository, 'feature');
